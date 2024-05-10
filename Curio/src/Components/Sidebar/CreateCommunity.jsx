import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton';
import PublicUnactive from '../../styles/icons/PublicUnactive';
import RestrictedUnactive from '../../styles/icons/RestrictedUnactive';
import PrivateUnactive from '../../styles/icons/PrivateUnactive';
import PublicActive from '../../styles/icons/PublicActive';
import RestrictedActive from '../../styles/icons/RestrictedActive';
import PrivateActive from '../../styles/icons/PrivateActive';
import RadioButtonUnactive from '../../styles/icons/RadioButtonUnactive';
import RadioButtonActive from '../../styles/icons/RadioButtonActive';
import Mature from '../../styles/icons/Mature';
import createCommunity from './CreateCommunityEndpoints.js';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import ExclamationPoint from '../../styles/icons/ExclamationPoint.jsx';

/**
 * CreateCommunity component renders a modal for creating a new community.
 * @param {object} props - The props for the CreateCommunity component.
 * @param {boolean} props.show - Boolean indicating whether the modal should be shown.
 * @param {Function} props.onHide - Function to handle modal close event.
 * @returns {JSX.Element} CreateCommunity JSX element.
 * @module CreateCommunity
 * @example
 * // Example usage of CreateCommunity component:
 * <CreateCommunity
 *   show={true}
 *   onHide={() => setShowModal(false)}
 * />
 */

function CreateCommunity(props) {
  const [selectedType, setSelectedType] = useState('public');
  const [charNum, setCharNum] = useState(0);
  const [communityName, setCommunityName] = useState('');
  const [isMature, setIsMature] = useState(false);
  const [isNameValid, setIsNameValid] = useState(0);
  const toast = useToast({
    containerStyle: {
      maxWidth: "2000px!important",
      backgroundColor: "#EB001F",
    },
  });
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  
  const handleChar = (event) => {
    const inputText = event.target.value;
    setCharNum(inputText.length);
    setCommunityName(inputText);
  };

  const handleMatureChange = () => {
    setIsMature(!isMature);
  };

  const handleNameValid = () => {
    if (communityName.length < 3) {
      setIsNameValid(1);
    } else {
      setIsNameValid(2);
    }
  };

  const handleCreateCommunity = async () => {
    const data = {
      name: communityName,
      description: 'testing',
      over18: isMature,
      privacyMode: selectedType
    }
    try{
      const response = await createCommunity({data});
      if (response.status === 200 || response.status === 201) {
        window.dispatchEvent(new Event('communityCreated'));
        navigate(`/r/${communityName}`);
        props.onHide();
      }
      if (response.response.status === 400){
        console.log('error bad request')
        toast({
          description: "That subreddit already exists",
          status: "error",
          position: "top",
          isClosable: true,
          containerStyle: {
            maxWidth: "2000px!important",
            width: "1000px",
            backgroundColor: "#EB001F",
            fontWeight: "300",
            borderRadius: "10px",
            marginTop: "4rem"
          },
          icon: <ExclamationPoint />,
          duration: null
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


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
            <h4 className='font-weight-heavy text-dark mt-2'>Create a community</h4>
            <button className='create-community-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='create-community mt-0 p-0'>
        <p className='create-community-muted'>
          Build and grow a community about something you care about. We'll help you set things up.
        </p>
        <form>
          <div className="mb-0">
            <div className='input-group rounded-5'>
              <div className='d-flex flex-column position-relative w-100'>
                <input type="text" onChange={handleChar} minLength={3} maxLength={21} style={{border: isNameValid===1 ? "3px solid #a50016" : "", paddingLeft: '20px', borderRadius: '30px'}} onBlur={handleNameValid} className="form-control create-community-name-input asterisk w-100 my-input" id="floatingInput" placeholder=" " />
                <label htmlFor="floatingInput" className="position-absolute h-100 d-flex align-items-center ms-4 my-floating">Name<span style={{color: '#a50016'}}>*</span></label>
              </div>
              {isNameValid == 2 && (
                <span className="tick-icon position-absolute top-50 end-0 translate-middle-y px-3">
                  <svg rpl="" class="trailing-icon valid" fill="#0e8a00" height="20" icon-name="checkmark-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15.958a1.102 1.102 0 0 1-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 0 1-.778.322Z"></path>
                  </svg>
                </span>
              )}
              {isNameValid == 1 && (
                <span className="tick-icon position-absolute top-50 end-0 translate-middle-y px-3">
                  <svg rpl="" class="trailing-icon invalid" fill="#a50016" height="20" icon-name="error-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18.75A8.75 8.75 0 1 0 18.75 10 8.76 8.76 0 0 0 10 1.25Zm-.533 13.716a1.077 1.077 0 0 1-.53-.92 1.058 1.058 0 0 1 .53-.919c.16-.096.343-.146.53-.144a1.056 1.056 0 0 1 .926.527 1.045 1.045 0 0 1 0 1.069c-.096.16-.23.293-.39.387a1.03 1.03 0 0 1-.536.143 1.016 1.016 0 0 1-.53-.143Zm-.14-3.329-.192-6.613h1.73l-.192 6.613H9.327Z">
                    </path>
                  </svg>
                </span>
              )}
              </div>
          </div>
          <div className='d-flex px-3 mt-0'>
            {isNameValid === 1 && <p className='create-community-muted-secondary' style={{color: isNameValid===1 ? "#a50016" : ""}}>Please lengthen this text to 3 characters or more (you are currently using {charNum} characters).</p>}
            {(isNameValid === 0 || isNameValid === 2) && <p className='create-community-muted-secondary' style={{color: isNameValid===2 ? "#0e8a00" : ""}}>Choose wisely. Once you pick a name, it can't be changed.</p>}
            <p className='create-community-muted-secondary ms-auto' style={{color: isNameValid===1 ? "#a50016" : ""}}>{charNum}</p>
          </div>
        <div>
            <h6 className='font-weight-heavy mb-4'>Type</h6>
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
                    <p style={{ color: '#000000', fontSize: '0.875rem', fontWeight: '0!important' }} className='mb-0 mt-0'>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    <p className='create-community-muted-secondary m-0'>{type === "public" ? "Anyone can view, post, and comment to this community" : type === "restricted" ? "Anyone can view, but only approved users can contribute" : "Only approved users can view and submit to this community"}</p>
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
        <hr className='w-100'></hr>
        <div className="d-flex p-3 px-4 radio-menu-item" onClick={handleMatureChange}>
            <Mature />
            <div className="mx-3 d-flex flex-column justify-items-start align-items-start">
              <h6 style={{ color: '#000000', fontSize: '0.875rem', position: "static" }} className='mt-0 mb-2'>Mature (18+)</h6>
              <p className='create-community-muted-secondary m-0'>Must be over 18 to view and contribute</p>
            </div>
            <div className='form-check form-switch ms-auto d-flex align-items-center'>
                <input style={{ transform: 'scale(1.5)' }} className='form-check-input ms-auto' checked={isMature} type="checkbox" id="mature" role="switch" name="mature" value="mature" />
            </div>
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='create-community mb-0 pb-0'>
        <button className="btn py-3 px-5 pb-3 create-community-cancel-button d-flex align-items-center justify-content-center" onClick={props.onHide}>Cancel</button>
        <button onClick={handleCreateCommunity} style={{width: 'auto', color: communityName!=="" ? "#FFFFFF" : "#000000", backgroundColor: communityName!=="" ? "#0045ac" : ""}} className="btn btn-lg create-community-cancel-button d-flex align-items-center justify-content-center" disabled={isCreateButtonDisabled}>{isCreateButtonDisabled ? 'Create your community' : `Create r/${communityName}`}</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCommunity;
