import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Authorization "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  type Subject = {
    #math;
    #science;
    #grammar;
    #reading;
    #socialStudies;
  };

  type StudyTip = {
    id : Nat;
    title : Text;
    content : Text;
    subject : Subject;
  };

  type Note = {
    id : Nat;
    fileName : Text;
    subject : Subject;
    description : Text;
    blob : Storage.ExternalBlob;
    uploadedBy : Principal;
  };

  type Question = {
    text : Text;
    options : [Text];
    correctAnswerIndex : Nat;
  };

  type Quiz = {
    id : Nat;
    title : Text;
    subject : Subject;
    questions : [Question];
  };

  type QuizResult = {
    userId : Principal;
    quizId : Nat;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Int;
    answers : [Nat];
  };

  type StudyPlan = {
    userId : Principal;
    subjects : [Subject];
    timeSlots : [Text];
    timetable : Text;
  };

  type GameProgress = {
    userId : Principal;
    currentLevel : Nat;
    completedLevels : [Nat];
    quizScoresPerLevel : [(Nat, Nat)];
    unlockedLevels : [Nat];
  };

  type GameData = {
    completedSubjectChallenges : [Text];
    scores : [Nat];
  };

  type PomodoroSettings = {
    focusTime : Nat;
    breakTime : Nat;
  };

  type UserProfile = {
    email : Text;
    role : Text;
    name : Text;
  };

  // Study Tips Storage
  let studyTips = Map.empty<Nat, StudyTip>();
  var nextTipId = 0;

  // Notes Storage
  let notes = Map.empty<Nat, Note>();
  var nextNoteId = 0;

  // Quiz Storage
  let quizzes = Map.empty<Nat, Quiz>();
  var nextQuizId = 0;

  // Quiz Results Storage
  let quizResults = Map.empty<Nat, QuizResult>();
  var nextResultId = 0;

  // Study Plans Storage
  let studyPlans = Map.empty<Principal, StudyPlan>();

  // Game Progress Storage
  let gameProgress = Map.empty<Principal, GameProgress>();

  // Game Data Storage (legacy)
  let gameData = Map.empty<Principal, GameData>();

  // Pomodoro Settings
  var pomodoroSettings : PomodoroSettings = {
    focusTime = 25;
    breakTime = 5;
  };

  // User Profiles Storage
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Include authentication system
  let accessControlState = Authorization.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // ============ USER PROFILE MANAGEMENT ============

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not Authorization.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ============ STUDY TIPS MANAGEMENT ============

  public shared ({ caller }) func createStudyTip(title : Text, content : Text, subject : Subject) : async Nat {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create study tips");
    };
    let newTip : StudyTip = {
      id = nextTipId;
      title;
      content;
      subject;
    };
    studyTips.add(nextTipId, newTip);
    let tipId = nextTipId;
    nextTipId += 1;
    tipId;
  };

  public query func getAllStudyTips() : async [StudyTip] {
    studyTips.values().toArray();
  };

  public query func getStudyTipsBySubject(subject : Subject) : async [StudyTip] {
    let tips = studyTips.values().toArray();
    tips.filter(func(tip) { tip.subject == subject });
  };

  public shared ({ caller }) func updateStudyTip(id : Nat, title : Text, content : Text, subject : Subject) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update study tips");
    };
    switch (studyTips.get(id)) {
      case (?_) {
        let updatedTip : StudyTip = {
          id;
          title;
          content;
          subject;
        };
        studyTips.add(id, updatedTip);
      };
      case (null) {
        Runtime.trap("Study tip not found");
      };
    };
  };

  public shared ({ caller }) func deleteStudyTip(id : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete study tips");
    };
    studyTips.remove(id);
  };

  public query func searchStudyTips(keyword : Text) : async [StudyTip] {
    let tips = studyTips.values().toArray();
    tips.filter(func(tip) {
      tip.title.contains(#text keyword) or tip.content.contains(#text keyword);
    });
  };

  // ============ NOTES MANAGEMENT ============

  public shared ({ caller }) func addNote(fileId : Storage.ExternalBlob, subject : Subject, fileName : Text, description : Text) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload notes");
    };
    let newNote : Note = {
      id = nextNoteId;
      fileName;
      blob = fileId;
      subject;
      description;
      uploadedBy = caller;
    };
    notes.add(nextNoteId, newNote);
    nextNoteId += 1;
  };

  public query func getAllNotes() : async [Note] {
    notes.values().toArray();
  };

  public query func getNotesBySubject(subject : Subject) : async [Note] {
    let entries = notes.toArray();
    let filteredEntries = entries.filter(func((_, note)) { note.subject == subject });
    filteredEntries.map(func((_, note)) { note });
  };

  public shared ({ caller }) func deleteNote(noteId : Nat) : async () {
    if (not (Authorization.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete notes");
    };
    notes.remove(noteId);
  };

  // ============ QUIZ SYSTEM ============

  public shared ({ caller }) func createQuiz(title : Text, subject : Subject, questions : [Question]) : async Nat {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create quizzes");
    };
    let newQuiz : Quiz = {
      id = nextQuizId;
      title;
      subject;
      questions;
    };
    quizzes.add(nextQuizId, newQuiz);
    let quizId = nextQuizId;
    nextQuizId += 1;
    quizId;
  };

  public query func getAllQuizzes() : async [Quiz] {
    quizzes.values().toArray();
  };

  public query func getQuizzesBySubject(subject : Subject) : async [Quiz] {
    let allQuizzes = quizzes.values().toArray();
    allQuizzes.filter(func(quiz) { quiz.subject == subject });
  };

  public shared ({ caller }) func submitQuizAnswers(quizId : Nat, answers : [Nat]) : async Nat {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quiz answers");
    };
    switch (quizzes.get(quizId)) {
      case (?quiz) {
        var score = 0;
        var i = 0;
        while (i < answers.size()) {
          if (i < quiz.questions.size() and answers[i] == quiz.questions[i].correctAnswerIndex) {
            score += 1;
          };
          i += 1;
        };
        let result : QuizResult = {
          userId = caller;
          quizId;
          score;
          totalQuestions = quiz.questions.size();
          timestamp = 0;
          answers;
        };
        quizResults.add(nextResultId, result);
        nextResultId += 1;
        score;
      };
      case (null) {
        Runtime.trap("Quiz not found");
      };
    };
  };

  public query ({ caller }) func getQuizResultsForUser() : async [QuizResult] {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their results");
    };
    let results = quizResults.values().toArray();
    results.filter(func(result) { result.userId == caller });
  };

  public query ({ caller }) func getQuizResultsForQuiz(quizId : Nat) : async [QuizResult] {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all quiz results");
    };
    let results = quizResults.values().toArray();
    results.filter(func(result) { result.quizId == quizId });
  };

  public shared ({ caller }) func deleteQuiz(id : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete quizzes");
    };
    quizzes.remove(id);
  };

  // ============ STUDY PLANNER ============

  public shared ({ caller }) func createStudyPlan(subjects : [Subject], timeSlots : [Text], timetable : Text) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create study plans");
    };
    let plan : StudyPlan = {
      userId = caller;
      subjects;
      timeSlots;
      timetable;
    };
    studyPlans.add(caller, plan);
  };

  public query ({ caller }) func getStudyPlan() : async ?StudyPlan {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view study plans");
    };
    studyPlans.get(caller);
  };

  public shared ({ caller }) func updateStudyPlan(subjects : [Subject], timeSlots : [Text], timetable : Text) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update study plans");
    };
    let plan : StudyPlan = {
      userId = caller;
      subjects;
      timeSlots;
      timetable;
    };
    studyPlans.add(caller, plan);
  };

  // ============ GAME PROGRESS TRACKING ============

  public shared ({ caller }) func saveGameProgress(currentLevel : Nat, completedLevels : [Nat], quizScoresPerLevel : [(Nat, Nat)], unlockedLevels : [Nat]) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save game progress");
    };
    let progress : GameProgress = {
      userId = caller;
      currentLevel;
      completedLevels;
      quizScoresPerLevel;
      unlockedLevels;
    };
    gameProgress.add(caller, progress);
  };

  public query ({ caller }) func getGameProgress() : async ?GameProgress {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view game progress");
    };
    gameProgress.get(caller);
  };

  public shared ({ caller }) func updateLevelCompletion(level : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update level completion");
    };
    switch (gameProgress.get(caller)) {
      case (?existing) {
        let updatedCompleted = existing.completedLevels.concat([level]);
        let updated : GameProgress = {
          existing with completedLevels = updatedCompleted;
        };
        gameProgress.add(caller, updated);
      };
      case (null) {
        let newProgress : GameProgress = {
          userId = caller;
          currentLevel = level;
          completedLevels = [level];
          quizScoresPerLevel = [];
          unlockedLevels = [level];
        };
        gameProgress.add(caller, newProgress);
      };
    };
  };

  public shared ({ caller }) func saveLevelQuizScore(level : Nat, score : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save quiz scores");
    };
    switch (gameProgress.get(caller)) {
      case (?existing) {
        let updatedScores = existing.quizScoresPerLevel.concat([(level, score)]);
        let updated : GameProgress = {
          existing with quizScoresPerLevel = updatedScores;
        };
        gameProgress.add(caller, updated);
      };
      case (null) {
        let newProgress : GameProgress = {
          userId = caller;
          currentLevel = level;
          completedLevels = [];
          quizScoresPerLevel = [(level, score)];
          unlockedLevels = [level];
        };
        gameProgress.add(caller, newProgress);
      };
    };
  };

  public query func getLeaderboard() : async [(Principal, Nat)] {
    let allProgress = gameProgress.toArray();
    let scores = allProgress.map(
      func((principal, progress)) {
        var totalScore = 0;
        for ((_, score) in progress.quizScoresPerLevel.vals()) {
          totalScore += score;
        };
        (principal, totalScore);
      }
    );
    scores.sort(
      func(a, b) {
        if (a.1 > b.1) { #less } else if (a.1 < b.1) { #greater } else { #equal };
      }
    );
  };

  // ============ LEGACY GAME DATA (for backward compatibility) ============

  public shared ({ caller }) func completeSubjectChallenge(subjectId : Text) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete challenges");
    };
    let userGameData = switch (gameData.get(caller)) {
      case (?existing) {
        let updatedChallenges = existing.completedSubjectChallenges.concat([subjectId]);
        { existing with completedSubjectChallenges = updatedChallenges };
      };
      case (null) {
        {
          completedSubjectChallenges = [subjectId];
          scores = [];
        };
      };
    };
    gameData.add(caller, userGameData);
  };

  public query ({ caller }) func hasCompletedSubjectChallenge(subjectId : Text) : async Bool {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check challenge completion");
    };
    switch (gameData.get(caller)) {
      case (?data) {
        data.completedSubjectChallenges.find(func(challenge) { challenge == subjectId }) != null;
      };
      case (null) { false };
    };
  };

  public shared ({ caller }) func recordScore(score : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record scores");
    };
    let userGameData = switch (gameData.get(caller)) {
      case (?existing) {
        let updatedScores = existing.scores.concat([score]);
        { existing with scores = updatedScores };
      };
      case (null) {
        {
          completedSubjectChallenges = [];
          scores = [score];
        };
      };
    };
    gameData.add(caller, userGameData);
  };

  public query ({ caller }) func getGameScores() : async [Nat] {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their scores");
    };
    switch (gameData.get(caller)) {
      case (?data) { data.scores };
      case (null) { [] };
    };
  };

  // ============ PROGRESS STATISTICS ============

  public query ({ caller }) func getOverallProgress() : async {
    quizScores : [Nat];
    gameProgressData : ?GameProgress;
    studyHours : Nat;
  } {
    if (not (Authorization.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their progress");
    };
    let results = quizResults.values().toArray();
    let userResults = results.filter(func(result) { result.userId == caller });
    let scores = userResults.map(func(result) { result.score });
    {
      quizScores = scores;
      gameProgressData = gameProgress.get(caller);
      studyHours = 0;
    };
  };

  public query ({ caller }) func getAdminStatistics() : async {
    totalUsers : Nat;
    totalQuizzes : Nat;
    totalNotes : Nat;
    totalStudyTips : Nat;
  } {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };
    {
      totalUsers = userProfiles.size();
      totalQuizzes = quizzes.size();
      totalNotes = notes.size();
      totalStudyTips = studyTips.size();
    };
  };

  // ============ POMODORO SETTINGS ============

  public query func getPomodoroSettings() : async PomodoroSettings {
    pomodoroSettings;
  };

  public shared ({ caller }) func updatePomodoroSettings(focusTime : Nat, breakTime : Nat) : async () {
    if (not (Authorization.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Pomodoro settings");
    };
    pomodoroSettings := {
      focusTime;
      breakTime;
    };
  };
};
