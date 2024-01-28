
        let myLeads=[]
       /*  myLeads=JSON.stringify(myLeads)
        myLeads=JSON.parse(myLeads)
        myLeads.push("www.amazon.com")
        myLeads=JSON.stringify(myLeads)
       console.log(typeof myLeads)
         */
        const inputEl=document.getElementById("input-el")
        const inputBtn=document.getElementById("input-btn")
        const ulEl=document.getElementById("ul-el")
        const deleteBtn=document.getElementById("delete-btn")
        const tabBtn=document.getElementById("tab-btn")
        const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));//because we cannot reassign it below code so const
    
        if(leadsFromLocalStorage)//leadsFromLocalStorage is truthy save above localstorage value to save the myleads array,after render it via renderLeads()
        {
          myLeads=leadsFromLocalStorage
          render(myLeads)
        }
        
        function render(leads){
          let listItems=""
            for(i=0; i<leads.length; i++)
              { 
               //listItems+="<li><a href='#' target='_blank'>" +myLeads[i]+ "</a></li>"  //target attribute is used for open the new tab
              // listItems+="<li><a target='_blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>"
               listItems+=`
               <li>
                   <a target='_blank' href="${leads[i]}">
                       ${leads[i]}
                   </a>
               </li> `
              }
                  ulEl.innerHTML=listItems
                 
            }

          tabBtn.addEventListener("click",function(){
           /*  chrome.tabs.query({active: true, currentdWindow: true}, function(tabs) {
               }) */
               chrome.tabs.query({active:true ,currentWindow:true},tabs=>
               {
                myLeads.push(tabs[0].url);
                //                    keys       key-values
                localStorage.setItem("myLeads",JSON.stringify(myLeads))
               render(myLeads)
               })
          })

        deleteBtn.addEventListener("dblclick",function(){
          console.log("double clicked")
          localStorage.clear()
          myLeads=[]
          render(myLeads)
        })

         //localStorage.setItem("myLeads","www.amazon.com")
        
        //localStorage.setItem("myName","Jeyachanndran")
        //let name=localStorage.getItem("myName");
       // localStorage.clear()
        inputBtn.addEventListener("click",function()
        {
            myLeads.push(inputEl.value)
            inputEl.value=""
           
             localStorage.setItem("myLeads",JSON.stringify(myLeads))
            
            render(myLeads) 
        })
           /* //another way of doing it instead of using innerHTML  //DOM manipulation come with the cost so we donot 
           include into the for loop for 3 times run so we replace the listitems for that so its more fast .so we use innehtml outside
            the loop instead of inside loop//
            const li=document.createElement("li")
            li.textContent=myLeads[i]
            ulEl.append(li)
            
            json-we can store data and send to the client server or website
            */
    
    