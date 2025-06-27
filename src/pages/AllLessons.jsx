import React, { useEffect, useState } from 'react';

// Static lesson data provided by the user (simulating an API response)
const staticLessonsData = {
    "message": "Lessons fetched successfully",
    "success": true,
    "data": [
        {
            "_id": "685bb4068bb728a726c41daf",
            "title": "نسبة وتناسب",
            "description": "تعلم كيفية استخدام النسب والتناسب في الحياة اليومية وكيفية حل المشكلات باستخدام الضرب التبادلي.",
            "video": "https://www.youtube.com/watch?v=ZvfD2EGRgZ8",
            "classLevel": "الصف الأول الثانوي",
            "price": 65,
            "isPaid": true,
            "scheduledDate": "2025-07-01T00:00:00.000Z",
            "createdBy": "68599234c302e6199bd32146",
            "createdAt": "2025-06-25T08:32:06.897Z",
            "updatedAt": "2025-06-25T08:32:06.897Z",
            "__v": 0
        },
        {
            "_id": "685bb4078bb728a726c41db3",
            "title": "مقدمة في الرسوم البيانية",
            "description": "تعرف على كيفية رسم البيانات على المستويات الإحداثية، وفهم الرسوم البيانية الخطية، وتفسير البيانات المرسومة.",
            "video": "https://www.youtube.com/watch?v=yUCdyT1gW9o",
            "classLevel": "الصف الأول الثانوي",
            "price": 50,
            "isPaid": true,
            "scheduledDate": "2025-07-03T00:00:00.000Z",
            "createdBy": "68599234c302e6199bd32146",
            "createdAt": "2025-06-25T08:32:07.419Z",
            "updatedAt": "2025-06-25T08:32:07.419Z",
            "__v": 0
        },
        {
            "_id": "685bb4078bb728a726c41db7",
            "title": "التعبيرات الجبرية",
            "description": "تعلم كيفية بناء وتبسيط التعبيرات الجبرية، واستكشاف تطبيقاتها في الحياة الواقعية.",
            "video": "https://www.youtube.com/watch?v=Cxk7nMRl5Gg",
            "classLevel": "الصف الأول الثانوي",
            "price": 55,
            "isPaid": false, // This one is now free for demonstration
            "scheduledDate": "2025-07-05T00:00:00.000Z",
            "createdBy": "68599234c302e6199bd32146",
            "createdAt": "2025-06-25T08:32:07.967Z",
            "updatedAt": "2025-06-25T08:32:07.967Z",
            "__v": 0
        },
        {
            "_id": "685bb4088bb728a726c41dbb",
            "title": "مراجعة الوحدة: الجبر والحساب",
            "description": "تراجع هذه الوحدة المفاهيم الأساسية من الوحدة، بما في ذلك أساسيات الجبر والمعادلات والعمليات الحسابية، مع مسائل تدريبية وحلول.",
            "video": "https://www.youtube.com/watch?v=SwlXKX5gD8A",
            "classLevel": "الصف الأول الثانوي",
            "price": 50,
            "isPaid": true,
            "scheduledDate": "2025-07-07T00:00:00.000Z",
            "createdBy": "68599234c302e6199bd32146",
            "createdAt": "2025-06-25T08:32:08.506Z",
            "updatedAt": "2025-06-25T08:32:08.506Z",
            "__v": 0
        }
    ],
    "pagination": {
        "total": 4,
        "page": 1,
        "totalPages": 1
    }
};

const AllLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentMessage, setPaymentMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLessons = () => {
            setLoading(true);
            setError('');
            setTimeout(() => {
                try {
                    if (staticLessonsData.success && staticLessonsData.data) {
                        const fetchedLessons = staticLessonsData.data.map(lesson => ({
                            ...lesson,
                            paidByUser: Math.random() > 0.7 
                        }));
                        setLessons(fetchedLessons);
                    } else {
                        throw new Error(staticLessonsData.message || "Failed to fetch lessons.");
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }, 500); 
        };

        fetchLessons();
    }, []);

    const handleEnrollAction = (lesson) => {
        if (!lesson.isPaid || lesson.paidByUser) {
            // In a real app, you would use React Router's navigate function.
            // For now, we'll use window.location.href for simplicity.
            window.location.href = `/lesson/${lesson._id}`;
            console.log(`Navigating to lesson: ${lesson.title}`);
        } else {

            setPaymentMessage(`للتسجيل في "${lesson.title}", يجب عليك الدفع أولاً.`);
            setTimeout(() => setPaymentMessage(''), 4000); // Hide the message after 4 seconds
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
                <p className="text-xl text-gray-800 dark:text-gray-200 animate-pulse">جاري تحميل الدروس...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
                <p className="text-xl text-red-500">حدث خطأ: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">جميع الدروس المتاحة</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">ابدأ رحلتك التعليمية وتصفح مجموعتنا المختارة من الدروس.</p>
                </header>

                {paymentMessage && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-8 text-center shadow-lg" role="alert">
                        {paymentMessage}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson._id}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col group"
                        >
                            <div className="relative">
                                <img
                                    src={`https://placehold.co/600x400/0056d2/ffffff?text=${encodeURIComponent(lesson.title)}&font=cairo`}
                                    alt={`غلاف درس: ${lesson.title}`}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                            </div>
                            
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight h-14">
                                    {lesson.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow text-sm">
                                    {lesson.description}
                                </p>
                                
                                <div className="mt-auto space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    {/* Conditional rendering for the enrollment button and price */}
                                    {lesson.paidByUser ? (
                                        <button 
                                            onClick={() => handleEnrollAction(lesson)}
                                            className="w-full bg-transparent border-2 border-green-500 text-green-500 font-bold py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-300"
                                        >
                                            اذهب إلى الدرس
                                        </button>
                                    ) : !lesson.isPaid ? (
                                        <button 
                                            onClick={() => handleEnrollAction(lesson)}
                                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            ابدأ الآن مجاناً
                                        </button>
                                    ) : (
                                        <>
                                            <p className="text-center text-2xl font-extrabold text-gray-800 dark:text-white">
                                                {lesson.price} جنيه
                                            </p>
                                            <button 
                                                onClick={() => handleEnrollAction(lesson)}
                                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                            >
                                                سجل الآن
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllLessons;
