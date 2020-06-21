window.addEventListener( 'DOMContentLoaded', async ( event ) => { 
    //clear chat-window
    document.querySelector( '#chat-box' ).innerHTML = ''
    
    const BotDefault = [
        'what is your name',
        'what do you do',
    ]
    
    //button and input
    const btn = document.querySelector( "#send" ),
        textInput = document.querySelector( "#text" ), 
        chatBox = document.querySelector( "#chat-box" );


    /* Function to POST data */
    const postData = async ( url = '', data = {} ) => {
        try
        {
            const options = {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify( data )
            };
            
            try {
                const resp = await fetch( url, options )
                const respData = resp.json();

                return respData;
                
            } catch (error) {
                console.log( error );
            }
            
        } catch ( error )
        {
            alert( "error: ", error );

        }
    }
    /* generator for unique div */
    const generateUID = () => {
        return `ereyomi${ Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 ) }`
    }
    /* loading - updateUI */
    let isLoading = 0;

    /* update UI */
    const updateUserInterface = ( { status = false, id = 0, botDefault = false }, userText = '', reply = '') => {
        
        console.log("botDefault: ", botDefault);
        textInput.value = ''

        const botchat = document.createElement( 'div' )
        botchat.setAttribute( 'class', 'bot chat' )
        const userchat = document.createElement( 'div' )

        if ( botDefault && botDefault === true )
        {
            botchat.setAttribute( 'id', `${id}` )
            botchat.innerHTML = `
                <div class="thumbnail">
                    <img src="images/chatbotB.png" alt="chatbot">
                </div>
                <div class="dotsContainer">
                    <span id="dot1"></span>
                    <span id="dot2"></span>
                    <span id="dot3"></span>
                </div>
            `;
            chatBox.appendChild( botchat )
        }
        
        if ( status === true && userText !== '')
        {
            /* update user text first */
            userchat.setAttribute( 'class', 'chat' )
            userchat.innerHTML = `
                <div class="chat">
                    <p class="text text-user">
                    ${userText}
                    </p>
                </div>
            `;
        /* ------------ */
            chatBox.appendChild( userchat )

            botchat.setAttribute( 'id', `${id}` )
            botchat.innerHTML = `
                <div class="thumbnail">
                    <img src="images/chatbotB.png" alt="chatbot">
                </div>
                <div class="dotsContainer">
                    <span id="dot1"></span>
                    <span id="dot2"></span>
                    <span id="dot3"></span>
                </div>
            `;
            chatBox.appendChild( botchat )
        } else
        {
            const botId = document.querySelector(`#${id}`)
            botId.innerHTML = `
            <div class="thumbnail">
                <img src="images/chatbotB.png" alt="chatbot">
            </div>
            <p class="text">
                ${reply}
                </p>
            `;
        }
        
        
    }
    const performProcess = (defaultData = '') => {

        console.log("defaultData: ", typeof defaultData, defaultData)
        let text = '';

        /* loading bot reply */
        const loading = {
            id: generateUID(),
            status: true
        }

        if ( typeof defaultData  === 'string' && defaultData !== '' )
        {
            loading.botDefault = true
            text = defaultData

        } else
        {
            text = textInput.value
            console.log( "passed in text: ", text )
            updateUserInterface(loading, text);
            
        }
        
        
        /* post data to project data */
        postData( '/api/botreply', { text: text } )
        .then( data => {
                if ( data !== null || typeof data !== 'undefined' )
                {
                    console.log( data )
                    
                    loading.status = false

                    updateUserInterface(loading, text ,data.reply);

                } else
                {
                    alert( "An error occur while trying to post weather data" );
            } 
            console.log("processed")
        })
        
    }
    // Event listener to add function to existing HTML DOM element
    btn.addEventListener( 'click', performProcess );


    //load default
    ( () => {
        BotDefault.forEach( ( theData ) => {
            performProcess(theData)
        });
        
    })()


} );
