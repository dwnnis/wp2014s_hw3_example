(function(){Parse.initialize("s4747jSandiQGpXlbizjGZMgXJAepvnGnbc7NCmu","PihDCqy36lpBPQc8rmiEH477nSD0tT1vrSSjBAm0");var e={};["loginView","evaluationView"].forEach(function(t){templateCode=document.getElementById(t).text;e[t]=doT.template(templateCode)});var t={loginRequiredView:function(e){return function(){var t=Parse.User.current();if(t){e()}else{window.location.hash="login/"+window.location.hash}}}};var n={navbar:function(){var e=Parse.User.current();if(e){document.getElementById("loginButton").style.display="none";document.getElementById("logoutButton").style.display="block";document.getElementById("evaluationButton").style.display="block"}else{document.getElementById("loginButton").style.display="block";document.getElementById("logoutButton").style.display="none";document.getElementById("evaluationButton").style.display="none"}document.getElementById("logoutButton").addEventListener("click",function(){Parse.User.logOut();n.navbar();window.location.hash="login/"})},evaluationView:t.loginRequiredView(function(){var t=Parse.Object.extend("Evaluation");var r=Parse.User.current();var i=new Parse.ACL;i.setPublicReadAccess(false);i.setPublicWriteAccess(false);i.setReadAccess(r,true);i.setWriteAccess(r,true);var s=new Parse.Query(t);s.equalTo("user",r);s.first({success:function(s){window.EVAL=s;if(s===undefined){var o=TAHelp.getMemberlistOf(r.get("username")).filter(function(e){return e.StudentId!==r.get("username")?true:false}).map(function(e){e.scores=["0","0","0","0"];return e})}else{var o=s.toJSON().evaluations}document.getElementById("content").innerHTML=e.evaluationView(o);document.getElementById("evaluationForm").addEventListener("submit",function(){for(var e=0;e<o.length;e++){for(var u=0;u<o[e].scores.length;u++){var a=document.getElementById("stu"+o[e].StudentId+"-q"+u);var f=a.options[a.selectedIndex].value;o[e].scores[u]=f}}if(s===undefined){s=new t;s.set("user",r);s.setACL(i)}console.log(o);s.set("evaluations",o);s.save(null,{success:function(){alert("Result saved in database.");n.evaluationView()},error:function(){}})},false)},error:function(e,t){}})}),loginView:function(t){var r=function(e){var t=document.getElementById(e).value;return TAHelp.getMemberlistOf(t)===false?false:true};var i=function(e,t,n){if(!t()){document.getElementById(e).innerHTML=n;document.getElementById(e).style.display="block"}else{document.getElementById(e).style.display="none"}};var s=function(){n.navbar();window.location.hash=t?t:""};var o=function(){var e=document.getElementById("form-signup-password");var t=document.getElementById("form-signup-password1");var n=e.value===t.value?true:false;i("form-signup-message",function(){return n},"Passwords don't match.");return n};document.getElementById("content").innerHTML=e.loginView();document.getElementById("form-signin-student-id").addEventListener("keyup",function(){i("form-signin-message",function(){return r("form-signin-student-id")},"The student is not one of the class students.")});document.getElementById("form-signin").addEventListener("submit",function(){if(!r("form-signin-student-id")){alert("The student is not one of the class students.");return false}Parse.User.logIn(document.getElementById("form-signin-student-id").value,document.getElementById("form-signin-password").value,{success:function(e){s()},error:function(e,t){i("form-signin-message",function(){return false},"Invaild username or password.")}})},false);document.getElementById("form-signup-student-id").addEventListener("keyup",function(){i("form-signup-message",function(){return r("form-signup-student-id")},"The student is not one of the class students.")});document.getElementById("form-signup-password1").addEventListener("keyup",o);document.getElementById("form-signup").addEventListener("submit",function(){if(!r("form-signup-student-id")){alert("The student is not one of the class students.");return false}var e=o();if(!e){return false}var t=new Parse.User;t.set("username",document.getElementById("form-signup-student-id").value);t.set("password",document.getElementById("form-signup-password").value);t.set("email",document.getElementById("form-signup-email").value);t.signUp(null,{success:function(e){s()},error:function(e,t){i("form-signup-message",function(){return false},t.message)}})},false)}};var r=Parse.Router.extend({routes:{"":"indexView","peer-evaluation/":"evaluationView","login/*redirect":"loginView"},indexView:n.evaluationView,evaluationView:n.evaluationView,loginView:n.loginView});this.Router=new r;Parse.history.start();n.navbar()})()
