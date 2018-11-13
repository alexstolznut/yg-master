angular.
module('core.e').
factory('emService',
    function ($q, $http) {

        var data_js = {
            "access_token": "a92hxnllyfofnbuq42jyscq9"
        };

//        function js_onSuccess() {
//            // remove this to avoid redirect
//            window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
//        }
//
//        function js_onError(error) {
//            // remove this to avoid redirect
//            window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
//        }

        var sendMessage = function (form) {

            //            endButton.value = 'Sending…';
            //            sendButton.disabled = true;
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    js_onSuccess();
                } else
                if (request.readyState == 4) {
                    js_onError(request.response);
                }
            };


           
            window.console.log(form);
            var name = form.querySelector('[name=name]').value;
            var email = form.querySelector(" [name='email']").value;
            var message = form.querySelector(" [name='message']").value;

            data_js['subject'] = 'Yongtai Contact Notification';
            data_js['text'] = 'name: ' + name + '\n\n' + 'from: ' + email + '\n\n' + 'message: ' + message;

            var params = toParams(data_js);

            request.open("POST", "https://postmail.invotes.com/send", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            request.send(params);

            return false;
            
            window.console.log(name, email, message);

        }
        
        function toParams(data_js) {
        var form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
    }




        /* Make the local functions and variables accessible to external code */
        return {
            sendMail: sendMessage
        };
    });
