import React, { Component } from 'react';
import { fetchAds } from '../../../api/api'
import Loader from '../loader/loader';

function AdCard() {
    const [image, setImage] = React.useState(null);

    const setImageUrl = (image) => setImage(image)

    React.useEffect(() => {
        fetchAds().then(url => {
            if (url) {
                setImageUrl(url)
            }
        }).catch(e => console.log(e))

        return () => { }
    }, [])

    return (

        image ?
            (<div style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                border: '1px solid black'
            }
            } >
                <p>But first, a word from our sponsors</p>
                <div
                    style={{
                        width: '100%',
                        height: '250px',
                        backgroundImage: 'url(' + image + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                </div>
            </div >
            ) :
            (<div style={{
                width: '100%',
                textAlign: 'center',
            }}><Loader /></div>)

    )


}

export default AdCard