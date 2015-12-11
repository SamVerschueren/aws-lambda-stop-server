# AWS Lambda Stop Server [![Build Status](https://travis-ci.org/SamVerschueren/aws-lambda-stop-server.svg?branch=master)](https://travis-ci.org/SamVerschueren/aws-lambda-stop-server)

> AWS Lambda function that will stop servers that have a tag with the key `StopGroup` and the value the name of the lambda function.


## Usage

Download the [zip](https://github.com/SamVerschueren/aws-lambda-stop-server/releases) file and deploy it as a lambda function.

After you deployed the lambda function, you navigate to `Event sources` and choose for the `Scheduled Event`. After naming your event, you can provide
the following schedule expression.

```
cron(15 17 ? * MON-FRI *)
```

This expression wil stop the servers every weekday, from monday to friday, at 17:15 PM.


### Tags

Tagging your instance is very important in order for the lambda function to work properly. The lambda function will retrieve all the instances that have a tag with a key `StopGroup`,
and a value being the name of the lambda function you provided.

For instance, if you named your lambda function `OfficeHoursTerminator`, make sure you add a tag with key-value `StopGroup=OfficeHoursTerminator` to all the instances you want to stop
at the provided schedule.

### IAM Role

Make sure your lambda function is able to describe and stop instances.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "MyStatementId",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:StopInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```


## Related

- [aws-lambda-start-server](https://github.com/SamVerschueren/aws-lambda-start-server) - The same function but for starting the server.


## License

MIT © Sam Verschueren
