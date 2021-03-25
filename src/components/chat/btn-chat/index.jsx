import React, { useState } from 'react'
import { ZendeskAPI } from "react-zendesk";

import Commnets from '../../../assets/img/comments.svg'
import Paragraphs from '../../Paragraphs/Paragraphs';
import Zendesk from "react-zendesk";
import { useHistory } from 'react-router';
import ContactPage from '../../../pages/ContactPage';
const ZENDESK_KEY = "9207f350-8859-42cd-8262-9f2395397d77";

const setting = {
    color: {
        theme: "#e85900"
    },
    chat: {
        hide: true
    },
    launcher: {
        chatLabel: {
            "en-US": "Need Help"
        }
    },
    webWidget: {
        offset: { horizontal: '0px', vertical: '0px', zIndex: 999 }
    },
    contactForm: {
        fields: [
            { id: "description", prefill: { "*": "Worx" } }
        ]
    }
};



const BtnChat = () => {
    const history = useHistory()
    const [active, setActive] = useState(false)
    const onLoadZendesk = () => {
        ZendeskAPI('webWidget:on', 'chat:status', isActive)
    }
    const isActive = (e) => {
        if (e === 'online') {
            setActive(true)
            ZendeskAPI('webWidget', 'show')
        }
        else {
            ZendeskAPI('webWidget', 'hide')
            setActive(false)
        }

    }
    const onPress = () => {
        if (!active) {
            history.push('contact')
            ZendeskAPI('webWidget', 'hide')

        }
        else {

            ZendeskAPI('webWidget', 'show')
        }
    }

    if (history.location.pathname === '/contact') {
        return null
    }

    return (
        <>
            {
                !active && <div onClick={onPress} className="tw-absolute tw-bottom-10 tw-right-10 tw-z-50 tw-flex tw-bg-primary tw-px-4 tw-py-2 tw-rounded-full tw-cursor-pointer">
                    <img src={Commnets} width={20} />
                    <Paragraphs family='universe' className="tw-ml-3">
                        PREGUNTANOS
            </Paragraphs>
                </div>



            }
            <Zendesk defer zendeskKey={ZENDESK_KEY} {...setting} onLoaded={onLoadZendesk} />


        </>
    )
}

export default BtnChat
