import { Request, Response, response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}


export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;


    try {
      if (!filters.week_day || !filters.subject || !filters.time) {
        throw new Error('Missing filters')
      }

      const subject = filters.subject as string;
      const week_day = filters.week_day as string;
      const time = filters.time as string;

      const timeInMinutes = convertHoursToMinutes(time);

      const classes = await db('classes')
        .select(['classes.*', 'users.*'])
        .join('users', 'classes.user_id', '=', 'users.id')
        .join('class_schedule', 'classes.id', '=', 'class_id')
        .where('classes.subject', '=', subject)
        .andWhere('class_schedule.week_day', '=', week_day)
        .andWhere('class_schedule.from', '<=', timeInMinutes)
        .andWhere('class_schedule.to', '>', timeInMinutes)

      res.status(200).send({ classes })

    } catch (error) {

    }
  }

  async create(req: Request, res: Response) {
    const { name, avatar, bio, whatsapp, subject, cost, schedule } = req.body

    const trx = await db.transaction()

    try {
      const insertedUsersId = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });

      const userId = insertedUsersId[0];

      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id: userId
      });

      const classId = insertedClassesId[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        week_day: scheduleItem.week_day,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
        class_id: classId
      }));

      await trx('class_schedule').insert(classSchedule);

      console.log('1')
      await trx.commit();

      return res.sendStatus(201);

    } catch (error) {

      await trx.rollback();

      return res.status(400).send(error);
    }
  }
}