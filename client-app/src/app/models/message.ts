import { User } from "./user"

export interface Message {
    sentMessages: SentMessage[]
    receivedMessages: ReceivedMessage[]
}

export interface SentMessage {
    id: string
    senderUserId: string
    sender: User
    recieverUserId: string
    reciever: User
    content: string
    time: string
    approved: boolean
    approvedTime: string
}

export interface ReceivedMessage {
    id: string
    senderUserId: string
    sender: User
    recieverUserId: string
    reciever: User
    content: string
    time: string
    approved: boolean
    approvedTime: string
}

export interface MessageForm {
    id: string
    recieverUserEmail: string
    content: string;
}
