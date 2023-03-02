import './css/style.css'
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplates from './templates/ListTemplates';



const initApp = ():void => {

  // Getting instances of fullList and ListTemplates..
  const fullList = FullList.instance;
  const template = ListTemplates.instance;


  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;

  // Adding event listener to form
  itemEntryForm.addEventListener('submit',(event:SubmitEvent):void => {
    event.preventDefault();
   
    const input= document.getElementById('newItem') as HTMLInputElement

    // Trimming any spaces
    const newEntryText:string = input.value.trim();
    if(!newEntryText.length) return;

    const itemId:number = fullList.list.length ? parseInt(fullList.list[fullList.list.length -1].id) + 1 : 1;

    const newItem = new ListItem(itemId.toString(),newEntryText);

    // adding item to list

    fullList.addItem(newItem);

    // now rendering the list

    template.render(fullList);
  })

  // handling clear items part..

  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

  clearItems.addEventListener('click',():void => {
    fullList.clearList();
    template.clear();
  })
  fullList.load();
  template.render(fullList);
}

// app initialize when Dom content fully loaded..
document.addEventListener('DOMContentLoaded',initApp);

