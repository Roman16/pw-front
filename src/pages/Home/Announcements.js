import React from "react";
import announcementsIcon from '../../assets/img/icons/announcements-icon.svg';
import image from '../../assets/img/image.png';

const Announcements = () => {

    return (
        <section className='announcements'>
            <div className='section-title'>
                <img src={announcementsIcon} alt=""/>
                announcements
            </div>

            <div className="announcements-list">
                {[0, 1, 2].map((item, index) => (
                    <div key={`update_${index}`}>
                        <div className='image'>
                            <img src={image} alt=""/>
                        </div>

                        <div className='content'>
                            <div className='title'>Lorem ipsum dolor sit amet ipsum dolor sit amet</div>
                            <div className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                                amet
                                beatae.
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
};

export default Announcements;