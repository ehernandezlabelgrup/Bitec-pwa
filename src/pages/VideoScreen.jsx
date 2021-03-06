import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import ReactPlayer from 'react-player'
import { useHistory, useLocation } from 'react-router-dom'
import FloatInfo from '../components/FloatInfo/FloatInfo'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { actionOFFVideo, actionOnVideo } from '../infraestructure/redux/actions/session'

const VideoScreen = () => {
    const history = useHistory()
    const location = useLocation()
    const [videos, setvideos] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (history.location.state) {
            setvideos({
                ...history.location.state
            })
            dispatch(actionOnVideo())
        }
        else {
            history.replace("/campaing");
        }
        return () => {
            dispatch(actionOFFVideo())
        }
    }, [])

    
    return (
      <Layout className="tw-bg-black-900" padding={true}>
        {videos && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="tw-h-full tw-w-full tw-relative"
            onClick={() => videos.loop ? history.replace("campaing") : history.goBack()}
          >
            {videos.name && (
              <FloatInfo
                name={videos.name}
                description_short={videos.description_short}
              />
            )}

            <ReactPlayer
              url={videos.url}
              playing={true}
              width={"100%"}
              height="100%"
              controls={false}
              onEnded={() => history.goBack()}
              loop={videos.loop}
              onBuffer={() => console.log("ass")}
              muted={true}
            />
          </motion.div>
        )}
      </Layout>
    );
}
export default VideoScreen
