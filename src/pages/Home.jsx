import React, { useEffect, useState } from "react";

const ArrowLeftIcon = (props) => (
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="m12 19-7-7 7-7" />
		<path d="M19 12H5" />
	</svg>
);

// --- STATIC DATA MOCKING THE API RESPONSE ---
const staticLessonsData = {
	message: "Lessons fetched successfully",
	success: true,
	data: [
		{
			_id: "685bb4068bb728a726c41daf",
			title: "نسبة وتناسب",
			description:
				"تعلم كيفية استخدام النسب والتناسب في الحياة اليومية وكيفية حل المشكلات باستخدام الضرب التبادلي.",
			video: "https://www.youtube.com/watch?v=ZvfD2EGRgZ8",
			classLevel: "الصف الأول الثانوي",
			price: 65,
			isPaid: true,
			scheduledDate: "2025-07-01T00:00:00.000Z",
		},
		{
			_id: "685bb4078bb728a726c41db3",
			title: "مقدمة في الرسوم البيانية",
			description:
				"تعرف على كيفية رسم البيانات على المستويات الإحداثية، وفهم الرسوم البيانية الخطية، وتفسير البيانات المرسومة.",
			video: "https://www.youtube.com/watch?v=yUCdyT1gW9o",
			classLevel: "الصف الأول الثانوي",
			price: 50,
			isPaid: true,
			scheduledDate: "2025-07-03T00:00:00.000Z",
		},
		{
			_id: "685bb4078bb728a726c41db7",
			title: "التعبيرات الجبرية",
			description:
				"تعلم كيفية بناء وتبسيط التعبيرات الجبرية، واستكشاف تطبيقاتها في الحياة الواقعية.",
			video: "https://www.youtube.com/watch?v=Cxk7nMRl5Gg",
			classLevel: "الصف الأول الثانوي",
			price: 55,
			isPaid: false, // This one is free for demonstration
			scheduledDate: "2025-07-05T00:00:00.000Z",
		},
		{
			_id: "685bb4088bb728a726c41dbb",
			title: "مراجعة الوحدة: الجبر والحساب",
			description:
				"تراجع هذه الوحدة المفاهيم الأساسية من الوحدة، مع مسائل تدريبية وحلول.",
			video: "https://www.youtube.com/watch?v=SwlXKX5gD8A",
			classLevel: "الصف الأول الثانوي",
			price: 50,
			isPaid: true,
			scheduledDate: "2025-07-07T00:00:00.000Z",
		},
	],
};

const Home = () => {
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {

		// This function simulates fetching lessons from an API.
		const fetchLessons = () => {
			setLoading(true);
			setError("");
			// Simulate network delay
			setTimeout(() => {
				try {
					if (staticLessonsData.success && staticLessonsData.data) {
						// Get the first 3 lessons for the home page, and add a random 'paidByUser' status for demo
						const featuredLessons = staticLessonsData.data
							.slice(0, 3)
							.map((lesson) => ({
								...lesson,
								paidByUser: Math.random() > 0.6,
							}));
						setLessons(featuredLessons);
					} else {
						throw new Error(
							staticLessonsData.message || "Failed to fetch lessons."
						);
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

	const handleActionClick = (lesson) => {
		if (!lesson.isPaid || lesson.paidByUser) {
			window.location.href = `/lesson/${lesson._id}`;
		} else {
			alert("للتسجيل في هذا الدرس، يجب عليك الدفع أولاً.");
		}
	};

	const handleBrowseAllClick = () => {
		window.location.href = "/lessons";
	};

	return (
		<div
			className="bg-gray-50 dark:bg-gray-950 font-sans min-h-screen"
			dir="rtl"
		>
			{/* Hero Section */}
			<section className="bg-blue-600 dark:bg-blue-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
						أطلق العنان لإمكانياتك
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100 dark:text-blue-200">
						انضم إلى آلاف الطلاب الذين يتعلمون مهارات جديدة ويحققون أهدافهم من
						خلال منصتنا التعليمية.
					</p>
					<button
						onClick={handleBrowseAllClick}
						className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-blue-600 bg-white hover:bg-blue-50 transition-transform duration-200 ease-in-out hover:scale-105"
					>
						تصفح جميع الدروس
					</button>
				</div>
			</section>

			{/* Featured Lessons Section */}
			<main className="py-16 sm:py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
							اكتشف أحدث الدروس
						</h2>
						<p className="mt-2 text-md text-gray-600 dark:text-gray-400">
							دروس مختارة بعناية لمساعدتك على البدء في رحلتك التعليمية.
						</p>
					</div>

					{loading ? (
						<div className="text-center mt-12">
							<p className="text-lg text-gray-500 animate-pulse">
								جاري تحميل الدروس...
							</p>
						</div>
					) : error ? (
						<div className="text-center mt-12 bg-red-100 text-red-700 p-4 rounded-lg">
							<p>حدث خطأ: {error}</p>
						</div>
					) : (
						<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{lessons.map((lesson) => (
								<div
									key={lesson._id}
									className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
								>
									<div className="relative">
										<img
											src={`https://placehold.co/600x400/0056d2/ffffff?text=${encodeURIComponent(
												lesson.title
											)}&font=cairo`}
											alt={`غلاف درس: ${lesson.title}`}
											className="w-full h-48 object-cover rounded-t-xl"
										/>
									</div>
									<div className="p-5 flex flex-col flex-grow">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 h-14">
											{lesson.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-400 flex-grow text-sm">
											{lesson.description}
										</p>
										<div className="mt-auto pt-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
											{lesson.paidByUser ? (
												<button
													onClick={() => handleActionClick(lesson)}
													className="w-full bg-transparent border-2 border-green-500 text-green-500 font-bold py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
												>
													اذهب إلى الدرس
												</button>
											) : !lesson.isPaid ? (
												<button
													onClick={() => handleActionClick(lesson)}
													className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
												>
													ابدأ الآن مجاناً
												</button>
											) : (
												<>
													<p className="text-center text-2xl font-extrabold text-gray-800 dark:text-white">
														{lesson.price} جنيه
													</p>
													<button
														onClick={() => handleActionClick(lesson)}
														className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
					)}
					<div className="mt-16 text-center">
						<button
							onClick={handleBrowseAllClick}
							className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center justify-center gap-2 mx-auto"
						>
							<span>عرض كل الدروس</span>
							<ArrowLeftIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
			</main>

			{/* Footer Section */}
			<footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} منصة edu-master. جميع الحقوق
						محفوظة.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Home;
