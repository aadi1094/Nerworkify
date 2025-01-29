export interface User {
    _id: string;
    username: string;
    image: string;
  }
  
  export interface Post {
    _id: string;
    content: string;
  }
  
  export interface Notification {
    _id: string;
    type: 'LIKE' | 'CONNECTION';
    sender: User;
    recipient: string;
    post?: Post;
    read: boolean;
    createdAt: string;
  }
  