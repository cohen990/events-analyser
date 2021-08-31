import { STS, EventBridge } from "aws-sdk"

var sts = new STS();
var eventBridge = new EventBridge();

const analyseEventBus = async () => {
    const displayAccountId = async () => {
        const identity = await sts.getCallerIdentity().promise();
        console.log(`Analysing events in account: ${identity.Account}`);
    }

    const getEventBus = async () => {
        const defaultEventBus  = await eventBridge.describeEventBus().promise()
        const allRules = []
        var nextToken: string
        do{
            const response = await eventBridge.listRules({NextToken: nextToken}).promise()
            nextToken = response.NextToken
            allRules.push(...response.Rules)
            console.log(`Found ${allRules.length} rules so far...`)
        } while(nextToken)

        console.log(`Found ${allRules.length} rules in total`)
    }

    await displayAccountId();
    await getEventBus()
}

analyseEventBus()