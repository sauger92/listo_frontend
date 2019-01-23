
export class ListService{

    TodoList = [
        {
            task: 'Resa Billet',
            responsable:'sm',
            status:'Undone'
        },
        {
            task: 'Trouver loisir',
            responsable:'sm',
            status:'Undone'
        }
    ];

    BringList = [
        {
            task: 'Creme Solaire',
            responsable:'sm',
            status:'Undone'
        },
        {
            task: 'Savon',
            responsable:'sm',
            status:'Undone'
        }
    ];

    AddTaskinList(Task:string, Responsable: string, Listtype: string)
    {
        const UserObject = {
            task: '',
            responsable:'',
            status:''
          };

        UserObject.task = Task;
        UserObject.responsable = Responsable;
        UserObject.status = 'Undone';

        //this.TodoList.push(UserObject);

       if (Listtype == "TodoList")
        {
            this.TodoList.push(UserObject);
        }
        else if (Listtype == "BringList")
        {   
            this.BringList.push(UserObject);
        }
        
    }
}
