import React from "react"
import PropTypes from 'prop-types';

import { convertToCents, formatDate } from '../../../utils/index'
import Button from '../button/button'
import './card.scss'

const Card = ({ id, size, price, face, date }) => (
    <div className="card" >
        <div className="card-info">
            <div className="left">
                <div className="size">
                    <p>
                        size:
                        <label>
                            {size}
                        </label>
                    </p>
                </div>
                <div className="buy">
                    <Button />
                </div>
            </div>
            <div className="right">
                <div className="price">
                    <label>
                        {convertToCents(price)}
                    </label>
                </div>
                <div className="face">
                    <span style={{ fontSize: size }}>{face}</span>
                </div>

                <div className="date">
                    <p>
                        {formatDate(date)}
                    </p>
                </div>

            </div>

        </div>
    </div>
);

Card.prototype = {
    id: PropTypes.number,
    size: PropTypes.number,
    price: PropTypes.string,
    face: PropTypes.string,
    date: PropTypes.string
}

export default Card