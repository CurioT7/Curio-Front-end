import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from '../styles/icons/CloseButton';
import PublicUnactive from '../styles/icons/PublicUnactive';
import RestrictedUnactive from '../styles/icons/RestrictedUnactive';
import PrivateUnactive from '../styles/icons/PrivateUnactive';
import PublicActive from '../styles/icons/PublicActive';
import RestrictedActive from '../styles/icons/RestrictedActive';
import PrivateActive from '../styles/icons/PrivateActive';
import RadioButtonUnactive from '../styles/icons/RadioButtonUnactive';
import RadioButtonActive from '../styles/icons/RadioButtonActive';
import Mature from '../styles/icons/Mature';

function CreateCommunity(props) {
  const [selectedType, setSelectedType] = useState('public');
  const [charNum, setCharNum] = useState(0);
  const [communityName, setCommunityName] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  
  const handleChar = (event) => {
    const inputText = event.target.value;
    setCharNum(inputText.length);
    setCommunityName(inputText);
  };

  const isCreateButtonDisabled = communityName.trim() === '';

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='create-community'
        size='lg'
    >
      <Modal.Header className='create-community mb-0 p-0'>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
          <div className='d-flex'>
            <img className='create-community-logo me-3' src='https://www.redditstatic.com/shreddit/assets/snoomojis/care.png' />
            <h2 className='font-weight-heavy mt-2'>Create a community</h2>
            <button className='create-community-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='create-community mt-0 p-0'>
        <p className='create-community-muted'>
          Build and grow a community about something you care about. We'll help you set things up.
        </p>
        <form>
          <div className="form-floating mb-0">
            <input type="text" onChange={handleChar} minLength={3} maxLength={21} className="form-control create-community-name-input" id="floatingInput" placeholder="Name*" />
            <label htmlFor="floatingInput">Name*</label>
          </div>
          <div className='d-flex px-3 mt-0'>
            <p className='create-community-muted-secondary'>Choose wisely. Once you pick a name, it can't be changed.</p>
            <p className='create-community-muted-secondary ms-auto'>{charNum}</p>
          </div>
        <div>
            <h5 className='font-weight-heavy mb-4'>Type</h5>
            <div>
              {['public', 'restricted', 'private'].map((type) => (
                <div
                  key={type}
                  className={`d-flex radio-menu-item p-3 px-4 ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => handleTypeChange(type)}
                >
                  {type === 'public' && (selectedType === type ? <PublicActive /> : <PublicUnactive />)}
                  {type === 'restricted' && (selectedType === type ? <RestrictedActive /> : <RestrictedUnactive />)}
                  {type === 'private' && (selectedType === type ? <PrivateActive /> : <PrivateUnactive />)}
                  <div className="mx-3 d-flex flex-column">
                    <h6 style={{ color: '#f2f4f5', fontSize: '18px' }} className='mb-0'>{type.charAt(0).toUpperCase() + type.slice(1)}</h6>
                    <p className='create-community-muted-secondary m-0'>Anyone can view, post, and comment to this community.</p>
                  </div>
                  <div className='ms-auto'>
                  {type === 'public' && (selectedType === type ? <RadioButtonActive /> : <RadioButtonUnactive />)}
                  {type === 'restricted' && (selectedType === type ? <RadioButtonActive /> : <RadioButtonUnactive />)}
                  {type === 'private' && (selectedType === type ? <RadioButtonActive /> : <RadioButtonUnactive />)}
                    </div>
                </div>
              ))}
            </div>
        </div>
        <hr></hr>
        <div className="d-flex p-3 px-4 radio-menu-item">
            <Mature />
            <div className="mx-3 d-flex flex-column">
              <h6 style={{ color: '#f2f4f5', fontSize: '18px' }} className='mb-0'>Mature (18+)</h6>
              <p className='create-community-muted-secondary m-0'>Must be over 18 to view and contribute</p>
            </div>
            <div className='form-check form-switch ms-auto d-flex align-items-center'>
                <input style={{ transform: 'scale(2)' }} className='form-check-input ms-auto' type="checkbox" id="mature" role="switch" name="mature" value="mature" />
            </div>
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='create-community'>
        <button className="btn py-3 px-5 pb-3 create-community-cancel-button d-flex align-items-center justify-content-center" onClick={props.onHide}>Cancel</button>
        <button style={{width: '40%', backgroundColor: communityName!=="" ? "#1870F4" : ""}} className="btn btn-lg create-community-cancel-button d-flex align-items-center justify-content-center" onClick={props.onHide} disabled={isCreateButtonDisabled}>{isCreateButtonDisabled ? 'Create your community' : `Create r/${communityName}`}</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCommunity;
