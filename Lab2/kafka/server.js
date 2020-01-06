var connection = new require('./kafka/Connection');
//topics files
var Signup = require('./services/signup.js');
var Login = require('./services/login.js');
var Home = require('./services/home.js');
var Profile = require('./services/profile.js');
var ProfileEdit = require('./services/profile_edit.js');
var People = require('./services/people.js');
var Conversations = require('./services/conversations.js');
var Conversations_new = require('./services/conversations_new.js');
var Get_conversations = require('./services/get_conversations.js');
var Send_message = require('./services/send_message.js');
var CourseCreate = require('./services/coursecreate.js');
var CourseSearch = require('./services/coursesearch.js');
var CourseHome = require('./services/coursehome.js');
var CourseAction = require('./services/courseaction.js');
var CoursePeople = require('./services/coursepeople.js');
var CourseEnWt = require('./services/courseenwt.js');
var AnnGet = require('./services/annget.js');
var AnnId = require('./services/annid.js');
var AnnPost = require('./services/annpost.js');
var Quiz = require('./services/quiz.js');
var QuizPost = require('./services/quizpost.js');
var QuizGet = require('./services/quizget.js');
var QuizSubmit = require('./services/quizsubmit.js');
var Grade = require('./services/grade.js');
var FileGet = require('./services/fileget.js');
var FilePost = require('./services/filepost.js');
var AssignmentGet = require('./services/assignmentget.js');
var Assignment = require('./services/assignment.js');
var Submission = require('./services/submission.js');
var Subgrade = require('./services/subgrade.js');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Server.js - Server is running ');
    consumer.on('message', function (message) {
        console.log('Server.js - Message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('Server.js - After handle: ',res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log("Server.js - Producers's dData: ", data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", Signup)
handleTopicRequest("login", Login)
handleTopicRequest("course", Home)
handleTopicRequest("profile", Profile)
handleTopicRequest("profile_edit", ProfileEdit)
handleTopicRequest("people", People)
handleTopicRequest("conversations", Conversations)
handleTopicRequest("conversations_new", Conversations_new)
handleTopicRequest("get_conversations", Get_conversations)
handleTopicRequest("send_message", Send_message)
handleTopicRequest("coursecreate", CourseCreate)
handleTopicRequest("coursesearch", CourseSearch)
handleTopicRequest("coursehome", CourseHome)
handleTopicRequest("courseaction", CourseAction)
handleTopicRequest("coursepeople", CoursePeople)
handleTopicRequest("courseenwt", CourseEnWt)
handleTopicRequest("annget", AnnGet)
handleTopicRequest("annid", AnnId)
handleTopicRequest("annpost", AnnPost)
handleTopicRequest("quiz", Quiz)
handleTopicRequest("quizpost", QuizPost)
handleTopicRequest("quizget", QuizGet)
handleTopicRequest("quizsubmit", QuizSubmit)
handleTopicRequest("grade", Grade)
handleTopicRequest("fileget", FileGet)
handleTopicRequest("filepost", FilePost)
handleTopicRequest("assignmentget", AssignmentGet)
handleTopicRequest("assignment", Assignment)
handleTopicRequest("submission", Submission)
handleTopicRequest("subgrade", Subgrade)
