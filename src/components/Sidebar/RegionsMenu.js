import React from 'react';
import PropTypes from 'prop-types';
import { /* Avatar, */ List } from 'antd';

const RegionsMenu = ({ regions, user }) => regions.map((region) => (
      <div className="CountryList">
        <h4>{region.region}</h4>
            <List
                itemLayout="horizontal"
                dataSource={region.countries}
                renderItem={(country) => (
                    <List.Item className="CountryItem">
                        <List.Item.Meta
                            avatar={
                                <img src={`/assets/img/${country.flag}`} alt="country-flag" />
                            }
                            title={country.name}
                            description={country.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    ));

RegionsMenu.propTypes = {
    item: PropTypes.shape({
        link: PropTypes.string,
        icon: PropTypes.string,
        title: PropTypes.string,
        className: PropTypes.string,
        subMenu: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string,
                link: PropTypes.string,
            }),
        ),
    }),
    parentLink: PropTypes.string,
};

export default RegionsMenu;
