import mongoose from 'mongoose'
import notesUsers from '../model/signupModel';
import Notification from '../model/notificationModel';

async function sendNotification (email:string, content:string, notesID:string){

    const isUser = notesUsers.findOne({email:email})
    if(isUser){
        const notification = {
            content : content,
            userId: isUser.id,
            notesId: notesID
        }
        Notification.create(notification)
        return
    }
    const emailBody = "";
}