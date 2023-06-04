import {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from '@dnd-kit/sortable';
import {restrictToParentElement} from '@dnd-kit/modifiers';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilepondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import skills from "./skills";
import languages from "./languages";
import experience from "./experience";
import education from "./education";
import Header from "./Header";
import {Portal} from "./Portal";

import './Main.css';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageResize,
    FilepondPluginImageTransform
);

const modifiers = [restrictToParentElement];

function BinIcon(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 14 14" {...props}>
            <g fill="currentColor" fillRule="evenodd">
                <path d="M4.375 6.125h1.75v5.25h-1.75zM7.875 6.125h1.75v5.25h-1.75z" />
                <path
                    d="M10.5.875C10.5.35 10.15 0 9.625 0h-5.25C3.85 0 3.5.35 3.5.875v1.75H0v1.75h.875v8.75c0 .525.35.875.875.875h10.5c.525 0 .875-.35.875-.875v-8.75H14v-1.75h-3.5V.875zm-5.25.875h3.5v.875h-3.5V1.75zm6.125 2.625v7.875h-8.75V4.375h8.75z"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
}

function WorkEducationInfo({index, date, title, place, description, privateArea, deleteEducation}) {
    const [dateInputValue, setDateInputValue] = useState('');
    useEffect(() => {
        setDateInputValue(date)
    }, [date]);

    const onDateChange = useCallback((e) => {
        let value = e.target.value;
        setDateInputValue(value);
    }, [setDateInputValue]);

    const [titleInputValue, setTitleInputValue] = useState('');
    useEffect(() => {
        setTitleInputValue(title)
    }, [title]);

    const onTitleChange = useCallback((e) => {
        let value = e.target.value;
        setTitleInputValue(value);
    }, [setTitleInputValue]);

    const [placeInputValue, setPlaceInputValue] = useState('');
    useEffect(() => {
        setPlaceInputValue(place)
    }, [place]);

    const onPlaceChange = useCallback((e) => {
        let value = e.target.value;
        setPlaceInputValue(value);
    }, [setPlaceInputValue]);

    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    useEffect(() => {
        setDescriptionInputValue(description)
    }, [description]);

    const onDescriptionChange = useCallback((e) => {
        let value = e.target.value;
        setDescriptionInputValue(value);
    }, [setDescriptionInputValue]);

    const measurer = useRef(null);

    const updateBioSize = useCallback(() => {
        const box = document.getElementById('text-box-' + titleInputValue + index);
        if(box) {
            measurer.current = document.createElement('textarea');
            measurer.current.classList.add('Measurer');
            document.body.appendChild(measurer.current);
            measurer.current.setAttribute(
                'style',
                'width: ' + box.getBoundingClientRect().width + 'px  !important'
            );
            measurer.current.textContent = descriptionInputValue;
            let mh = measurer.current.scrollHeight;
            box.setAttribute('style', 'height: ' + mh + 'px  !important');
            return(
                document.body.removeChild(measurer.current)
            )
        }
    }, [descriptionInputValue, titleInputValue, index])

    window.onresize = function () {
        updateBioSize();
    }

    useEffect(() => {
        updateBioSize();
    }, [descriptionInputValue, updateBioSize]);

    const onDeleteClick = useCallback(() => {
        deleteEducation(index);
    }, [deleteEducation])

    return(
        <>
            <div>
                <input
                    className={"ResumeSectionInput" + (dateInputValue === "" ? " EmptyEducationInfo" : "")}
                    value={dateInputValue}
                    onChange={onDateChange}
                    disabled={!privateArea}
                />
            </div>
            <div>
                <div className={"TitleDiv"}>
                    <input
                        className={"Title" + (titleInputValue === "" ? " EmptyEducationInfo" : "")}
                        value={titleInputValue}
                        onChange={onTitleChange}
                        disabled={!privateArea}
                    />
                    {privateArea &&
                        <button onClick={onDeleteClick} className={"BinIconButton LanguageBinIconButton"}>
                            <BinIcon className={"BinIcon"}/>
                        </button>
                    }
                </div>
                <input
                    className={"ResumeSectionInput" + (placeInputValue === "" ? " EmptyEducationInfo" : "")}
                    value={placeInputValue}
                    onChange={onPlaceChange}
                    disabled={!privateArea}
                />
                {(descriptionInputValue || descriptionInputValue === "") && <textarea
                    id={'text-box-' + titleInputValue + index}
                    value={descriptionInputValue}
                    onChange={onDescriptionChange}
                    placeholder={""}
                    disabled={!privateArea}
                    className={"TextBox" + (descriptionInputValue === "" ? " EmptyEducationInfo" : "")}
                />}
            </div>
        </>
    )
}

function LanguageLevel({level, privateArea}) {
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        setInputValue(level)
    }, [level]);

    const onChange = useCallback((e) => {
        let value = e.target.value;
        setInputValue(value);
    }, [setInputValue]);

    return (
        <input value={inputValue} placeholder={'Write the level'} onChange={onChange} disabled={!privateArea}/>
    );
}

function ForeignLanguage({index, name, listening, reading, speaking, writing, privateArea, deleteForeignLanguage}) {
    const [nameInputValue, setNameInputValue] = useState('');
    useEffect(() => {
        setNameInputValue(name)
    }, [name]);

    const onNameChange = useCallback((e) => {
        let value = e.target.value;
        setNameInputValue(value);
    }, [setNameInputValue]);

    const onDeleteClick = useCallback(() => {
        deleteForeignLanguage(index);
    }, [index, deleteForeignLanguage])

    return (
        <tr>
            <td className={"TableColumn"}>
                <input
                    value={nameInputValue}
                    onChange={onNameChange}
                    placeholder={'Write the language'}
                    disabled={!privateArea}
                />
            </td>
            <td>
                <LanguageLevel privateArea={privateArea} level={listening} />
            </td>
            <td>
                <LanguageLevel privateArea={privateArea} level={reading} />
            </td>
            <td>
                <LanguageLevel privateArea={privateArea} level={speaking} />
            </td>
            <td>
                <LanguageLevel privateArea={privateArea} level={writing} />
            </td>
            {privateArea && <td>
                    <button onClick={onDeleteClick} className={"BinIconButton LanguageBinIconButton"}>
                        <BinIcon className={"BinIcon"}/>
                    </button>
            </td>}
        </tr>
    );
}

function DragHandleIcon(props) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7 8C7 7.17157 6.32843 6.5 5.5 6.5C4.67157 6.5 4 7.17157 4 8C4 8.82843 4.67157 9.5 5.5 9.5C6.32843 9.5 7 8.82843 7 8Z"
                fill="currentColor"
            />
            <path
                d="M7 3.5C7 2.67157 6.32843 2 5.5 2C4.67157 2 4 2.67157 4 3.5C4 4.32843 4.67157 5 5.5 5C6.32843 5 7 4.32843 7 3.5Z"
                fill="currentColor"
            />
            <path
                d="M7 12.5C7 11.6716 6.32843 11 5.5 11C4.67157 11 4 11.6716 4 12.5C4 13.3284 4.67157 14 5.5 14C6.32843 14 7 13.3284 7 12.5Z"
                fill="currentColor"
            />
            <path
                d="M11.5 8C11.5 7.17157 10.8284 6.5 10 6.5C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5C10.8284 9.5 11.5 8.82843 11.5 8Z"
                fill="currentColor"
            />
            <path
                d="M11.5 3.5C11.5 2.67157 10.8284 2 10 2C9.17157 2 8.5 2.67157 8.5 3.5C8.5 4.32843 9.17157 5 10 5C10.8284 5 11.5 4.32843 11.5 3.5Z"
                fill="currentColor"
            />
            <path
                d="M11.5 12.5C11.5 11.6716 10.8284 11 10 11C9.17157 11 8.5 11.6716 8.5 12.5C8.5 13.3284 9.17157 14 10 14C10.8284 14 11.5 13.3284 11.5 12.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

const Skill = forwardRef(
    (
    {
        id,
        index,
        name,
        privateArea,
        deleteSkill,
        dragAttributes,
        dragListeners,
        insertPosition,
        isDragging,
    }, ref) => {
    const [skillInputValue, setSkillInputValue] = useState('');
    useEffect(() => {
        setSkillInputValue(name)
    }, [name]);

    const measurer = useRef(null);
    const getTextLength = useCallback(() => {
        const box = document.getElementById('skill-input-' + skillInputValue + index );
        measurer.current = document.createElement('span');
        measurer.current.classList.add('Measurer');
        document.body.appendChild(measurer.current);
        measurer.current.textContent = (skillInputValue !== "" ? skillInputValue : 'Write the skill') ;
        let mw = measurer.current.getBoundingClientRect().width;
        mw = Math. ceil(mw);
        box.setAttribute('style', 'width: ' + mw  + 'px  !important');
        return(
            document.body.removeChild(measurer.current)
        )
    }, [skillInputValue, index]);

    useEffect(() => {
        getTextLength();
    }, [skillInputValue, getTextLength])

    const onChange = useCallback((e) => {
        let value = e.target.value;
        setSkillInputValue(value);
    }, [setSkillInputValue]);

    const onDeleteClick = useCallback(() => {
        deleteSkill(index);
    }, [index, deleteSkill]);

    return (
        <div className={"SkillDiv" + (privateArea? " SkillDivPrivate" : "") + " " + insertPosition + (isDragging ? " IsDragging" : "")} id={id} ref={ref}>
            <input
                id={'skill-input-' + skillInputValue + index}
                className={"SkillInput"}
                value={skillInputValue}
                placeholder={'Write the skill'}
                onChange={onChange}
                disabled={!privateArea}
            />
            {privateArea &&
                <>
                    <button onClick={onDeleteClick} className={"BinIconButton"}>
                        <BinIcon className={"BinIcon"}/>
                    </button>
                    <span className={"DragHandle"} {...dragListeners} {...dragAttributes}>
                    <DragHandleIcon />
                    </span>
                </>
            }
        </div>

    )
}
);


function SortableSkill({id, index, activeIndex, ...props}) {
    const {
        attributes: dragAttributes,
        listeners: dragListeners,
        setNodeRef,
        overIndex,
        isDragging,
    } = useSortable({
        id: `skill-${index}`,
        data: {
            id: `skill-${index}`,
        },
    });

    return (
        <Skill
            id={id}
            index={index}
            dragAttributes={dragAttributes}
            dragListeners={dragListeners}
            ref={setNodeRef}
            insertPosition={
                overIndex === index && overIndex !== activeIndex
                    ? index > activeIndex
                        ? "InsertAfter"
                        : "InsertBefore"
                    : null
            }
            isDragging={isDragging}
            {...props}
        />
    );
}

function Main({privateArea}) {
    const [skillsList, setSkillsList] = useState(skills);
    const [languagesList, setLanguagesList] = useState(languages);
    const [motherLanguageInput, setMotherLanguageInput] = useState('Serbian');
    const [experienceList, setExperienceList] = useState(experience);
    const [educationList, setEducationList] = useState(education);

    const measurer = useRef(null);
    const [textBoxValue, setTextBoxValue] = useState('My name is Marija Zdolsek and I am a full-stack developer working @ Indigo.ai, Milan based startup that works in Conversational Artificial Intelligence. I started to work in Indigo.ai immediately after I graduated at Politecnico di Milano, I started as an Machine Learning Intern, but after my internship I decided to change my job role and to focus more on developing platform for creating virtual assistants.')

    const onMyBioChange = useCallback((e) => {
        let value = e.target.value;
        setTextBoxValue(value);
    }, [setTextBoxValue]);

    const updateBioSize = useCallback(() => {
        const box = document.getElementById('text-box');
        measurer.current = document.createElement('textarea');
        measurer.current.classList.add('Measurer');
        document.body.appendChild(measurer.current);
        measurer.current.setAttribute(
            'style',
            'width: ' + box.getBoundingClientRect().width + 'px  !important'
        );
        measurer.current.textContent = textBoxValue;
        let mh = measurer.current.scrollHeight;
        box.setAttribute('style', 'height: ' + mh + 'px  !important');
        return(
            document.body.removeChild(measurer.current)
        )
    }, [textBoxValue])

    window.onresize = function () {
        updateBioSize();
    }

    useEffect(() => {
        updateBioSize();
    }, [textBoxValue, updateBioSize]);

    const onMotherLanguageChange = useCallback((e) => {
        let value = e.target.value;
        setMotherLanguageInput(value);
    }, [setMotherLanguageInput]);

    const onAddInfo = useCallback((type) => () => {
            switch(type) {
                case "language":
                    setLanguagesList(prevState => [...prevState, {title: '', listening: '', reading: '', speaking: '', writing: ''}])
                    break;
                case "skill":
                    setSkillsList(prevState => [...prevState, '']);
                    break;
                case "experience":
                    setExperienceList(prevState => [...prevState, {date: '', title: '', place: '', description: ''}]);
                    break;
                case "education":
                    setEducationList(prevState => [...prevState, {date: '', title: '', place: ''}]);
                    break;
                default:
                    break;
            }
    },
    [
        setSkillsList,
        setLanguagesList,
        setExperienceList,
        setEducationList
    ]
    )

    const deleteInfo = useCallback((type) => (ind) => {
        switch(type) {
            case "language":
                setLanguagesList(prevState => prevState.filter((item, index) => index !== ind));
                break;
            case "skill":
                setSkillsList(prevState => prevState.filter((item, index) => index !== ind));
                break;
            case "experience":
                setExperienceList(prevState => prevState.filter((item, index) => index !== ind));
                break;
            case "education":
                setEducationList(prevState => prevState.filter((item, index) => index !== ind));
                break;
            default:
                break;
        }

    }, [setLanguagesList, setSkillsList]);

    const pondRef = useRef(null);

    const [imageFile, setImageFile] = useState('../IMG_3819.jpg');

    useEffect(() => {
        const image = document.getElementById('image-container');
        if(image) {
            if(imageFile){
                image.setAttribute('style', 'background-image: url("' + imageFile + '") !important;')
            }
            else {
                image.setAttribute('style', 'background-image: transparent !important"');

            }
        }

    }, [imageFile])

    const handleRemovedFile = (/*error, fileData*/) => {
        setImageFile(null);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [itemBeingDragged, setItemBeingDragged] = useState(null);
    const dragIndex = skillsList.findIndex(
        (skill, index) => ('skill-' + index) === itemBeingDragged
    );

    console.log({dragIndex});
    console.log({itemBeingDragged})

    const onDragStart = useCallback((e) => {
        console.log(e.active)
        setItemBeingDragged(e.active.data.current.id);
    }, []);

    const onDragEnd = useCallback(
        (e) => {
            const {active, over} = e;
            console.log({active, over});

            if (active.id !== over?.id && over?.id) {
                setSkillsList((skillsList) => {
                    const oldIndex = skillsList.findIndex(
                        (skill, index) => 'skill-' + index === active.data.current.id
                    );
                    const newIndex = skillsList.findIndex(
                        (skill, index) => 'skill-' + index === over.data.current.id
                    );

                    return arrayMove(skillsList, oldIndex, newIndex);
                });
            }

            setItemBeingDragged(null);
        }, []);

    return (
        <div className={"MainPage"}>
            <div className={"MainContainer"}>
                <Header/>

                <div id="about-me" className={"AboutMe"}>
                    <div className={"MyImageContainer"}>
                        <div className={"MyImage"} id={'image-container'}>
                            {!imageFile && <FilePond
                            onremovefile={handleRemovedFile}
                            allowMultiple={false}
                            allowImageResize={true}
                            imageResizeUpscale={true}
                            maxFiles={1}
                            server="/api"
                            labelIdle="Add Picture"
                            credits={false}
                            instantUpload={false}
                            imageResizeTargetWidth={32}
                            imageResizeTargetHeight={32}
                            imagePreviewHeight={300}
                            allowProcess={false}
                            // onaddfile={handleAddedFile}
                            ref={pondRef}
                        />}
                        </div>
                        {privateArea && <button
                            className={"RemoveImageBtn"}
                            onClick={handleRemovedFile}
                        >
                            Remove Image
                        </button>
                        }
                    </div>

                    <div className={"MyBio"}>
                        <span>Full-Stack Developer</span>
                        <h1>Marija Zdolsek</h1>
                        <textarea
                            id={'text-box'}
                            value={textBoxValue}
                            onChange={onMyBioChange}
                            disabled={!privateArea}
                        />
                        <div className={"MyBioContactBtnContainer"}>
                            <a href="../CV-Zdolsek.pdf"
                               download={"zdolsek_cv.pdf"}
                               className={"MyBioContactBtn"}
                            >
                                Download CV
                            </a>
                            <a
                                href={window.location.href + "contact/"}
                                className={"MyBioContactBtn"}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
                <div id={"resume"} className={'Resume'}>
                    <div>
                        <h2>
                            WORK EXPERIENCE
                        </h2>
                            {
                                experienceList.map((experience, index) => {
                                    return <div key={index} className={"ResumeSection"}>
                                        <WorkEducationInfo
                                            index={index}
                                            date={experience.date}
                                            title={experience.title}
                                            place={experience.place}
                                            description={experience.description}
                                            privateArea={privateArea}
                                            deleteEducation={deleteInfo('experience')}
                                        />
                                    </div>
                                })
                            }
                        {privateArea &&
                            <div className={"BtnDiv"}>
                                <button
                                    className={"AddSkillBtn"}
                                    onClick={onAddInfo('experience')}
                                >
                                    Add Experience
                                </button>
                            </div>}
                    </div>
                    <div>
                        <h2>
                            EDUCATION
                        </h2>

                        {educationList.map((education, index) => {
                            return <div key={index} className={"ResumeSection EducationSection"}>
                                <WorkEducationInfo
                                    index={index}
                                    date={education.date}
                                    title={education.title}
                                    place={education.place}
                                    privateArea={privateArea}
                                    deleteEducation={deleteInfo('education')}
                                />
                            </div>
                        })
                        }
                        {privateArea &&
                            <div className={"BtnDiv"}>
                                <button
                                    className={"AddSkillBtn"}
                                    onClick={onAddInfo('education')}
                                >
                                    Add Education
                                </button>
                            </div>}
                    </div>
                    <div>
                        <h2>
                            LANGUAGE SKILLS
                        </h2>
                        <div className={"LanguageSection"}>
                            <div className={"ResumeSection"}>
                                <div className={"MotherLanguageContainer"}>
                                    <span>Mother tongue(s)</span>
                                </div>
                                <div>
                                    <input
                                        className={"ResumeSectionInput"}
                                        value={motherLanguageInput}
                                        placeholder={'Write the languages'}
                                        onChange={onMotherLanguageChange}
                                        disabled={!privateArea}
                                    />
                                </div>
                            </div>
                            <div className={"ResumeSection"}>
                                <div>
                                    <span>Foreign language(s)</span>
                                </div>
                                <div className={"ForeignLanguagesContainer"}>
                                    <table className={"LanguagesTable"}>
                                        <thead>
                                            <tr>
                                                <th>Language</th>
                                                <th>Listening</th>
                                                <th>Reading</th>
                                                <th>Speaking</th>
                                                <th>Writing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {languagesList.map((language, index) => {
                                                return language.title === '' && !privateArea ?
                                                    null :
                                                    <ForeignLanguage
                                                        key={index}
                                                        index={index}
                                                        name={language.title}
                                                        listening={language.listening}
                                                        reading={language.reading}
                                                        speaking={language.speaking}
                                                        writing={language.writing}
                                                        privateArea={privateArea}
                                                        deleteForeignLanguage={deleteInfo('language')}
                                                    />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {privateArea &&
                                <div className={"BtnDiv"}>
                                    <button
                                        className={"AddSkillBtn"}
                                        onClick={onAddInfo('language')}
                                    >
                                        Add Foreign Language
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div>
                        <h2>
                            DIGITAL SKILLS
                        </h2>
                        <div className={"ResumeSection"}>
                            <div>
                                <span>Skills</span>
                            </div>
                            <DndContext
                                sensors={sensors}
                                modifiers={modifiers}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            >
                                <div className={"SkillsSection"}>
                                    <SortableContext
                                        items={skillsList.map((skill, index) => `skill-${index}`)}
                                    >
                                    <div className={"SkillsContainer"}>
                                        {skillsList.map((skill, index) => {
                                            return (
                                                skill === '' && !privateArea ?
                                                    null :
                                                    <SortableSkill
                                                        id={`skill-${index}`}
                                                        key={index}
                                                        index={index}
                                                        activeIndex={dragIndex}
                                                        name={skill}
                                                        privateArea={privateArea}
                                                        deleteSkill={deleteInfo('skill')}
                                                    />
                                            )
                                        })}
                                        <Portal>
                                            <DragOverlay>
                                                {itemBeingDragged
                                                    ? skillsList
                                                        .filter((skill, index) => ('skill-' + index) === itemBeingDragged)
                                                        .map((skill, index) => {
                                                            return (
                                                                <Skill
                                                                    key={index}
                                                                    id={'skill-' + index}
                                                                    name={skill}
                                                                    index={index}
                                                                    privateArea={privateArea}
                                                                    deleteSkill={deleteInfo('skill')}

                                                                />
                                                            );
                                                        })
                                                    : null}
                                            </DragOverlay>
                                        </Portal>
                                    </div>
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                        {privateArea &&
                            <div className={"BtnDiv"}>
                                <button className={"AddSkillBtn"} onClick={onAddInfo('skill')}>
                                    Add Skill
                                </button>
                            </div>}
                    </div>
                </div>
                {privateArea &&
                    <div className={"SaveChangesBtnDiv"}>
                        <button
                            className={"AddSkillBtn"}
                        >
                            Save Changes
                        </button>
                    </div>}
            </div>
        </div>
    );
}

export default Main;
