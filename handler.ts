import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';


export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  AWS.config.update({region: 'eu-west-1'});
  const cwevents = new AWS.CloudWatchEvents({apiVersion: '2015-10-07'});

  const params = {
    Name: 'DEMO_EVENT',
    RoleArn: 'IAM_ROLE_ARN',
    ScheduleExpression: 'rate(5 minutes)',
    State: 'ENABLED'
  };

  cwevents.putRule(params, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.RuleArn);
    }
  });
};
