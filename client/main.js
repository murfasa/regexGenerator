import './style.css'

/*document.querySelector('#app').innerHTML = `
  
`*/ 

const form = document.getElementById('formy');

function loading(element) {
  element.innerHTML = ''

  
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('test');

  const data = new FormData(form);

  form.reset();

  const output = document.getElementById('generatedExpression');

  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('inputPrompt')
    })
  })

  output.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    //console.log(parsedData)

    output.innerHTML = parsedData;
  } else {
    const err = await response.text();

    output.innerHTML = "Something went wrong!";
    alert(err);
  }
}

form.addEventListener('submit', handleSubmit);