import React from "react";
import softwareUpdatesIcon from '../../assets/img/icons/software-updates-icon.svg';

const SoftwareUpdates = () => {

    return (
        <section className='software-updates'>
            <div className='section-title'>
                <img src={softwareUpdatesIcon} alt=""/>
                software updates
            </div>

            <div className='updates-list'>
                {[0, 1, 2].map((item, index) => (
                    <div className='updates' key={`update_${index}`}>
                        <div className='title'>Lorem ipsum dolor sit amet ipsum dolor sit amet</div>
                        <div className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                            beatae, eaque enim illum ipsam nam nemo perspiciatis placeat quam soluta tempora tempore
                            tenetur? Est labore mollitia neque suscipit temporibus.
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
};

export default SoftwareUpdates;