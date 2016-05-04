/**
 * Created by Tieiririyi on 2016-05-02.
 */
Meteor.publish("ledtypes", function () {
    return Ledtypes.find();
});