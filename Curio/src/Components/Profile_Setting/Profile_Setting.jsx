import React from 'react';
import "./Profile_Setting.css";

function ProfileSetting() {
  
  return (
    <div className="container">
      <div className="user-settings">
        <div className="user-settings-header">
          <h3 id='user_settings'>User settings</h3>
          <div className="user-settings-links d-flex justify-content-between">
            <a href="#" className="setting-link navbar-brand" id="account-link">Account</a>
            <a href="#" className="setting-link navbar-brand" id="profile-link">Profile</a>
            <a href="#" className="setting-link navbar-brand" id="safety-privacy-link">Safety & Privacy</a>
            <a href="#" className="setting-link navbar-brand" id="feed-settings-link">Feed Settings</a>
            <a href="#" className="setting-link navbar-brand" id="notifications-link">Notifications</a>
            <a href="#" className="setting-link navbar-brand" id="emails-link">Emails</a>
            <a href="#" className="setting-link navbar-brand" id="chat-messaging-link">Chat & Messaging</a>
          </div>
        </div><hr/>
        <div className="customize-profile">
          <div className="customize-profile-section">
            <h2 className='customize-profile-heading'>Customize profile</h2>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile Information</h3>
            <div className="profile-information">
              <div className="display-name">
                <h3 className="headings-settings d-flex fw-500 mb-1">Display name (optional)</h3>
                <p className="headings-description fw-normal text-muted">Set a display name. This does not change your username.</p>
              </div>
              <div className="display-name-input-container">
                <input type="text" className='form-control mr-sm-2' placeholder="Display name (optional)" maxLength="30" name="display-name-input" id="display-name-input" />
                <div className='word-remaining p-1 b-80 mb-4'>30 Characters remaining</div>
              </div>
            </div>
            <div className="about-section">
              <div className="about">
                <h3 className="headings-settings d-flex fw-500 mb-1">About (optional)</h3>
                <p className="headings-description fw-normal text-muted">A brief description of yourself shown on your profile.</p>
              </div>
              <div className="about-textarea-container">
                <textarea name="about-textarea" className='form-control mr-sm-2' id="about-textarea" cols="30" rows="4" maxLength="200" placeholder="About (optional)"></textarea>
                <div>
                  <div className='word-remaining p-1 b-80 mb-4'>200 Characters remaining</div>
                </div>
              </div>
            </div>
            <div className="social-links-section">
              <div className="social-links">
                <h3 className="headings-settings d-flex fw-500 mb-1">Social links (5 max)</h3>
                <p className="headings-description fw-normal text-muted">People who visit your profile will see your social links.</p>
              </div>
              <div className="social-links-nav">
                <nav aria-label="Social Links">
                  <ul className='list-unstyled d-flex flex-wrap gap-2'>
                    <li className='social-link d-flex align-items-center bg-light rounded-pill px-3 py-2'>
                    <i className="fa-solid fa-plus me-2"></i>Add social link
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Images</h3>
            <div className="profile-banner-images">
              <h3 className="headings-settings d-flex fw-500 mb-1">Profile and banner image</h3>
              <p className="headings-description fw-normal text-muted">Images must be .png or .jpg format</p>
            </div>
            <div className="image-upload-container d-flex flex-column align-items-start mt-3 mb-4">
              <div className="row">
                <div className="col">
                  <div className="upload-profile-image h-100 ms-3 me-0 card text-center">
                    <label htmlFor="profile-upload">
                      <div className='upload-icon-profile'>
                        <i className="fa-solid fa-upload"></i>
                      </div>
                      <div>
                        <span>Drag and Drop or Upload <span>Profile</span> Image</span>
                      </div>
                      <div className='upload-file-profile'>
                      <input type="file" name="profileIcon" id="profile-upload" accept="image/x-png,image/jpeg" />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="banner-upload h-100 ms-3 me-0 card text-center">
                    <label htmlFor="banner-upload">
                      <div className='upload-icon-profile'>
                        <i className="fa-solid fa-upload"></i>
                      </div>
                      <div>
                        <span>Drag and Drop or Upload <span>Banner</span> Image</span>
                      </div>
                      <div className='upload-file-profile'>
                        <input type="file" name="profileBanner" id="banner-upload" accept="image/x-png,image/jpeg" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile category</h3>
            <div className="profile-category d-flex flex-wrap mb-3">
              <div className="nsfw">
                <label htmlFor="nsfw-checkbox">
                  <h3 className="headings-settings d-flex fw-500 mb-1">NSFW</h3>
                </label>
                <p className="headings-description fw-normal text-muted">This content is NSFW (may contain nudity, pornography, profanity, or inappropriate content for those under 18)</p>
              </div>
              <div className="nsfw-checkbox">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                </div>
              </div>
            </div>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Advanced</h3>
            <div className="advanced d-flex flex-wrap mb-3">
              <div className="follow">
                <label htmlFor="follow-checkbox">
                  <h3 className="headings-settings d-flex fw-500 mb-1">Allow people to follow you</h3>
                </label>
                <p className="headings-description fw-normal text-muted">Followers will be notified about posts you make to your profile and see them in their home feed.</p>
              </div>
              <div className="follow-checkbox">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                </div>
              </div>
            </div>
            <div className="content-visibility d-flex flex-wrap mb-3">
              <div className="content-visibility-label">
                <label htmlFor="content-visibility-checkbox">
                  <h3 className="headings-settings d-flex fw-500 mb-1">Content visibility</h3>
                </label>
                <p className="headings-description fw-normal text-muted">Posts to this profile can appear in <a href="#">r/all</a> and your profile can be discovered in <a href="#">/users</a></p>
              </div>
              <div className="content-visibility-switch">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                </div>
              </div>
            </div>
            <div className="communities-visibility d-flex flex-wrap mb-3">
              <div className="communities-visibility-label">
                <label htmlFor="communities-visibility-checkbox">
                  <h3 className="headings-settings d-flex fw-500 mb-1">Active in communities visibility</h3>
                </label>
                <p className="headings-description fw-normal text-muted">Show which communities I am active in on my profile.</p>
              </div>
              <div className="communities-visibility-switch">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                </div>
              </div>
            </div>
            <div className="clear-history d-flex flex-wrap mb-3">
              <div className="clear-history-label">
                <h3 className="headings-settings d-flex fw-500 mb-1">Clear history</h3>
                <p className="headings-description fw-normal text-muted">Delete your post views history.</p>
              </div>
              <div className="clear-history-button">
                <button role="button" tabIndex="0" className='btn btn-primary'>Clear history</button>
              </div>
            </div>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile moderation</h3>
            <div className="profile-moderation mb-4">
              For moderation tools please visit our <a href="#">Profile Moderation page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
