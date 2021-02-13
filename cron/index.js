import Schedule from 'node-schedule';
import dealsController from '../controllers/deals';

const rule = new Schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

Schedule.scheduleJob(rule, async () => {
    const dateFilter = req?.query?.date || new Date();
    await dealsController.saveData(dateFilter);
});


Schedule.scheduleJob('00 * * * *', async () => {
    await dealsController.importDataToBling();
})