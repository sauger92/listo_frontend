export class GroupService{
    
    Groupusers = [
        {
            id : 0,
            useremail: 'jjkjkj@gmail.com',
        }
    ];

    addUserInGroup(name: string) {
        const UserObject = {
          id : 0,
          useremail: '',
        };
        UserObject.useremail = name;
        UserObject.id = this.Groupusers [(this.Groupusers .length - 1)].id + 1;
        this.Groupusers.push(UserObject);
    }

}