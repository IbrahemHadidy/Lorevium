import React, { useEffect, useState } from 'react';

// --- STATIC DATA MOCKING THE API RESPONSE ---
const staticLessonDetailData = {
    message: "Lesson fetched successfully",
    success: true,
    data: {
        _id: "685bb4068bb728a726c41daf",
        title: "Ratio and Proportion",
        description: "Learn how ratios and proportions are used in daily life and how to solve problems using cross multiplication. This foundational lesson will equip you with the skills to tackle more complex mathematical concepts.",
        video: "https://www.youtube.com/watch?v=ZvfD2EGRgZ8", // Using the video from the user's initial data
        classLevel: "Grade 1 Secondary",
        price: 65,
        isPaid: true,
        scheduledDate: "2025-07-01T00:00:00.000Z",
        // --- AUGMENTED DETAILS FOR A RICHER UI ---
        whatYouWillLearn: [
            "Understand the fundamental concept of ratios.",
            "Solve for missing values in proportions.",
            "Apply cross-multiplication to solve real-world problems.",
            "Distinguish between part-to-part and part-to-whole ratios.",
        ],
        instructor: {
            name: "Dr. Ahmed Hassan",
            bio: "PhD in Mathematics with over 15 years of teaching experience at the secondary and university levels.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        courseOutline: [
            { id: 1, title: "Welcome to the Course", status: "completed", duration: "3min" },
            { id: 2, title: "Introduction to Ratios", status: "completed", duration: "12min" },
            { id: 3, title: "Understanding Proportions", status: "current", duration: "15min" },
            { id: 4, title: "Solving with Cross-Multiplication", status: "locked", duration: "20min" },
            { id: 5, title: "Quiz: Ratios and Proportions", status: "locked", duration: "10min" },
        ]
    }
};


// --- ICONS (Self-contained SVG components) ---
const CheckIcon = ({ className = "inline-block mr-2 text-green-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-gray-500 dark:text-gray-400">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-gray-500 dark:text-gray-400">
        <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const LockIcon = ({ className = "inline-block mr-2 text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const PlayCircleIcon = ({ className = "inline-block mr-2 text-blue-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
);


const LessonDetails = () => {
    const lessonId = "685bb4068bb728a726c41daf";

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasPaid, setHasPaid] = useState(false);
    const [showPaymentMessage, setShowPaymentMessage] = useState(false);

    useEffect(() => {
        const fetchLessonDetails = () => {
            setLoading(true);
            setError('');

            setTimeout(() => {
                const response = staticLessonDetailData;

                if (response.success && response.data._id === lessonId) {
                    setLesson(response.data);

                    setHasPaid(!response.data.isPaid);
                } else {
                    setError("Lesson not found.");
                }
                setLoading(false);
            }, 500);
        };

        fetchLessonDetails();
    }, [lessonId]); 

    const handleEnrollClick = () => {
        console.log("Enrolling in lesson:", lesson.title);
        setHasPaid(true);
        setShowPaymentMessage(true);
        setTimeout(() => setShowPaymentMessage(false), 3000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-xl text-gray-800 dark:text-gray-200 animate-pulse">Loading Course Details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    if (!lesson) {
        return null; 
    }

    return (
        <div className="font-sans bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-200 min-h-screen">
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 lg:p-8">

                {/* --- Main Content Area (Left)--- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{lesson.title}</h1>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 rtl:space-x-reverse">
                            <p className="flex items-center"><UserIcon /> <strong>Level:</strong><span className="ml-1">{lesson.classLevel}</span></p>
                            <p className="flex items-center"><ClockIcon /> <strong>Date:</strong><span className="ml-1">{new Date(lesson.scheduledDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                        </div>
                    </div>

                    {/* Video Player or Locked Placeholder */}
                    {hasPaid ? (
                        <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-black">
                            <iframe
                                src={lesson.video}
                                title="Lesson Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-gray-800 flex items-center justify-center text-center p-8">
                            <div>
                                <LockIcon className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                                <h3 className="text-2xl font-bold text-white">Video Locked</h3>
                                <p className="text-gray-300 mt-2">Enroll in this course to watch the video and access all materials.</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What you'll learn</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            {lesson.whatYouWillLearn.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckIcon className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{lesson.description}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instructor</h2>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <img src={lesson.instructor.image} alt={lesson.instructor.name} className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{lesson.instructor.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{lesson.instructor.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Sidebar (Right) --- */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="sticky top-8">
                        {/* Enrollment Card */}
                        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 text-center border-t-4 border-blue-500">
                            {showPaymentMessage && (
                                <div className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 p-3 rounded-md text-sm mb-4">
                                    {lesson.isPaid ? 'Payment successful! You are now enrolled.' : 'Successfully registered!'}
                                </div>
                            )}

                            {!hasPaid ? (
                                <div className="space-y-4">
                                    <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{lesson.price} <span className="text-2xl font-normal">EGP</span></p>
                                    <button
                                        onClick={handleEnrollClick}
                                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                    >
                                        Enroll Now
                                    </button>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">30-Day Money-Back Guarantee</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <CheckIcon className="w-12 h-12 text-green-500 mx-auto" />
                                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">You are enrolled!</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">You have lifetime access to this lesson.</p>
                                </div>
                            )}
                        </div>

                        {/* Course Outline Card */}
                        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Course Content</h2>
                            <ul className="space-y-2">
                                {lesson.courseOutline.map((section) => (
                                    <li
                                        key={section.id}
                                        className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 text-sm
                                        ${section.status === 'completed' ? 'text-gray-500 dark:text-gray-400' : ''}
                                        ${section.status === 'current' ? 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold' : ''}
                                        ${section.status === 'locked' ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-70' : 'hover:bg-gray-100 dark:hover:bg-gray-800/60 cursor-pointer'}
                                        `}
                                    >
                                        <div className="flex items-center">
                                            {section.status === 'completed' && <CheckIcon className="w-5 h-5 mr-3 text-green-500" />}
                                            {section.status === 'current' && <PlayCircleIcon className="w-5 h-5 mr-3 text-blue-500" />}
                                            {section.status === 'locked' && <LockIcon className="w-5 h-5 mr-3 text-gray-400" />}
                                            <span>{section.title}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{section.duration}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LessonDetails;