const myApi = axios.create();

[].forEach.call(document.querySelectorAll('[class*="whatsapp_frame_"]'), function(w) {
  widget_whatsapp_help_init(w.className.replace(/whatsapp_frame_/g, ''))
});

function widget_whatsapp_help_init(key){
myApi
  .post("http://188.120.239.117:3000/client-widget/",{code:key})
  .then((res) => {
    let widget=document.querySelector('[class*="whatsapp_frame_'+key+'"]');
    let button=document.createElement('div');
    button.classList="widget-button";
    let dialog=document.createElement('div');
    dialog.classList="widget-dialog";

    switch (res.data[0].position_desktop){
      case "lt": {button.style.cssText="left:10px; top:10px;"; dialog.style.cssText="left:10px;top:65px;"; break;}
      case "lb": {button.style.cssText="left:10px; bottom:10px;"; dialog.style.cssText="left:10px;bottom:65px;"; break;}
      case "rt": {button.style.cssText="right:10px; top:10px;"; dialog.style.cssText="right:10px;top:65px;"; break;}
      case "rb": {button.style.cssText="right:10px; bottom:10px;"; dialog.style.cssText="right:10px;bottom:65px;"; break;}
    }

    button.style.cssText+="background-color:"+res.data[0].b_color+";";
    button.textContent=res.data[0].header;
    button.onclick=()=>{
      dialog.style.display = "block";
    }
    dialog.style.cssText+="border-color:"+res.data[0].b_color+";";

    widget.appendChild(button);
    widget.appendChild(dialog);

    let header=document.createElement('div');
    header.classList="widget-header";
    header.style.cssText+="background-color:"+res.data[0].b_color+";";
    header.textContent=res.data[0].description;
    dialog.appendChild(header);

    let hider=document.createElement('div');
    hider.classList="widget-hide";
    hider.textContent='x';
    hider.onclick=()=>{
      dialog.style.display = "none";
    }
    header.appendChild(hider);

    let body=document.createElement('div');
    body.classList="widget-body";
    dialog.appendChild(body);

    [].forEach.call(res.data, function(opData) {
      let operator=document.createElement('div');
      operator.classList="widget-operator"
      operator.textContent=opData.name;
      operator
      .setAttribute(
        "onclick",
        `sendClick(${opData.id},"${opData.link}");`
      );
      operator
      .setAttribute(
        "href",
        "#"
      );
      body.appendChild(operator);
    });
    
      console.log(res.data)
  })
  .catch((error) => {
    console.error(error);
  });
}

function sendClick(id,link){
  
  window.open(link);
  myApi
        .post('http://188.120.239.117:3000/click/', {
          o_id: id,
          c_name: 'Test city',
        })
        .then(err => {
          if (!err) {
          }
        })
}
