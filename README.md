# AWS Lambda Stop Server

> AWS Lambda function that stops servers.

## Usage

Download the [zip](https://github.com/SamVerschueren/aws-lambda-stop-server/releases) file and deploy it as a lambda function. The name of the
lambda function can be something like `OfficeHoursStop`.

After you deployed the lambda function, you navigate to `Event sources` and choose for the `Scheduled Event`. Provide a name for your scheduled event,
for instance `OfficeHoursStopSchedular`. The following expression will run the lambda function every weekday at 17:15 PM.

```
cron(15 17 ? * MON-FRI *)
```

The lambda function will stop all the instances that have a tag `LaunchGroup` with the value being the name of your lambda function, in this case for instance
`OfficeHoursStop`.

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

## Author

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
