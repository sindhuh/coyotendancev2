(function () {
    var _ = require('lodash');
    var utils = {
        dayMapping: {
            "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6
        },

        sanitizeUsers: function (users) {
            _.forEach(users, function (element) {
                _.omit(element, 'password');
            });
        },

        getIdsAfterFormating: function (userIds) {
            var ids = [];
            _.forEach(userIds, function (id) {
                ids.push("ObjectId(\"" + id + "\")");
            });
            return ids;
        },

        sendObjectInResponse: function (res, object) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(object));
        },

        getCourseDatesForTimings: function (quarter, timings) {
            var days = [];
            for (var i = 0; i < timings.length; i++) {
                days.push(this.dayMapping[timings[i].day]);
            }
            var date = "";
            var currentYear = new Date().getFullYear();
            var startDate = new Date(quarter.startDate + " " + currentYear);
            var endDate = new Date(quarter.endDate + " " + currentYear);
            var courseDates = [];
            while (startDate <= endDate) {
                if (days.indexOf(startDate.getDay()) > -1) {
                    date = "date" + (startDate.getMonth() + 1) + "_" + startDate.getDate()
                        + "_" + startDate.getFullYear();
                    courseDates.push(date);
                }
                startDate.setDate(startDate.getDate() + 1);
            }
            return courseDates;
        }
    }
    module.exports = utils;
} ());