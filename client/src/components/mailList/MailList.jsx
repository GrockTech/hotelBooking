import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className='mailListTitles'>save time, save money</h1>
        <span className="mailDesc">Sign up and we'll sen teh best deals to you</span>
        
        <div className="mailInputContainer">
        <input type="text" placeholder="Your Email"/>
        <button>Subscibe</button>

        </div>
      
    </div>
  )
}

export default MailList
