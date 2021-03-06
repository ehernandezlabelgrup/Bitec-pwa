import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { motion } from 'framer-motion';
import { Box } from './style';

const Carousels = ({ images }) => {
    const [indice, setIndice] = useState(0)
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: .5,
                delay: 0
            }}
            className="tw-relative tw-h-full"

        >
            {/* <div className="tw-absolute tw-w-6/12 tw-flex tw-bottom-0 tw-z-30">
                {
                    images.map(i => {
                        return <Box className="tw-rounded-md tw-mx-3 tw-overflow-hidden tw-shadow-md tw-mb-4" >
                            <img src={i.url} />
                        </Box>
                    })
                }
                {
                    images.map(i => {
                        return <Box className="tw-rounded-md tw-mx-3 tw-overflow-hidden tw-shadow-md tw-mb-4" >
                            <img src={i.url} />
                        </Box>
                    })
                }
            </div> */}

            <Carousel
                value={indice}
                // infinite
                itemWidth={500}
                centered
                offset={20}
                clickToChange
                keepDirectionWhenDragging
                slidesPerPage={2}
                onChange={(e) => setIndice(e)}
                className="tw-h-full tw-pt-26"
            >
                {
                    images.map(i => {
                        return <img src={i.url} alt={i.url} />

                    })
                }

            </Carousel>
            <div className="tw-absolute tw-bottom-0 tw-left-10 tw-w-full tw-flex tw-items-center tw-justify-center">
            <Dots
                value={indice}
                number={images.length}
                thumbnails={images.map((i, idx) => <Box onClick={() => setIndice(idx)} image={i.url}/>)}
            />

            </div>
           



        </motion.div>
    )
}

Carousels.propTypes = {
    images: PropTypes.array
}

Carousels.defaultProps = {
    images: []
}

export default Carousels
