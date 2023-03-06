import './style.css'

/*document.querySelector('#app').innerHTML = `
  
`*/ 

let startInterval

const form = document.getElementById('formy');

function loading(element) {
  element.innerHTML = ''

  startInterval = setInterval(function() {
    element.innerHTML += '.';

    if (element.innerHTML == '....') {
      element.innerHTML = '';
    }
  }, 250)
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  form.reset();

  const label = document.getElementById('outputLabel');
  const output = document.getElementById('generatedExpression');

  label.innerHTML = 'Output:';

  loading(output);

  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('inputPrompt')
    })
  })

  clearInterval(startInterval);
  output.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    //console.log(data.choices);
    //console.log(parsedData)

    output.innerHTML = parsedData;
  } else {
    const err = await response.text();

    output.innerHTML = "Something went wrong!";
    console.log(err);
  }
}

form.addEventListener('submit', handleSubmit);