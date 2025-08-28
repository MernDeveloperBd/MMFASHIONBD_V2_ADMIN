import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewSection = () => {
    const [rating, setRating] = useState(0); // user selected rating
    const [hoverRating, setHoverRating] = useState(0); // hover effect

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const submitReview = (e) => {
        e.preventDefault();
        if (!name || !comment || rating === 0) {
            alert("Please fill all fields and select a rating");
            return;
        }
        // এখানে API call করতে পারো
        console.log({ name, rating, comment });
        // Reset form
        setName("");
        setComment("");
        setRating(0);
        setHoverRating(0);
    };

    return (
        <div className="py-10">
            <h2 className="text-[25px] font-[500] mb-4">Customer Review</h2>
            {/* Reviews List */}
            <div className="reviewsWrap mt-3 w-[75%] h-[350px] overflow-hidden overflow-y-auto border border-black">
                <div className="reviews h-auto p-4 bg-white shadow-sm rounded-md flex flex-col gap-4 ">
                    {/* Single Review */}
                    <div className="flex gap-4 border-b-2 pb-1">
                        <img
                            src="https://i.ibb.co/0j1b4z5/user.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span> {/* Half/empty star */}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                This product is amazing! Very good quality and fast delivery. I highly recommend it to anyone.
                            </p>
                            <span className="text-gray-400 text-xs mt-1">28 Aug 2025</span>
                        </div>
                    </div>
                    <div className="flex gap-4  border-b-2 pb-1">
                        <img
                            src="https://i.ibb.co/0j1b4z5/user.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span> {/* Half/empty star */}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                This product is amazing! Very good quality and fast delivery. I highly recommend it to anyone.
                            </p>
                            <span className="text-gray-400 text-xs mt-1">28 Aug 2025</span>
                        </div>
                    </div>
                    <div className="flex gap-4  border-b-2 pb-1">
                        <img
                            src="https://i.ibb.co/0j1b4z5/user.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span> {/* Half/empty star */}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                This product is amazing! Very good quality and fast delivery. I highly recommend it to anyone.
                            </p>
                            <span className="text-gray-400 text-xs mt-1">28 Aug 2025</span>
                        </div>
                    </div>
                    <div className="flex gap-4  border-b-2 pb-1">
                        <img
                            src="https://i.ibb.co/0j1b4z5/user.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span> {/* Half/empty star */}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                This product is amazing! Very good quality and fast delivery. I highly recommend it to anyone.
                            </p>
                            <span className="text-gray-400 text-xs mt-1">28 Aug 2025</span>
                        </div>
                    </div>
                    <div className="flex gap-4  border-b-2 pb-1">
                        <img
                            src="https://i.ibb.co/0j1b4z5/user.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span> {/* Half/empty star */}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                This product is amazing! Very good quality and fast delivery. I highly recommend it to anyone.
                            </p>
                            <span className="text-gray-400 text-xs mt-1">28 Aug 2025</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Review Form */}
            <div className="mt-8 w-[75%] bg-white shadow-sm rounded-md p-6">
                <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
                <form className="flex flex-col gap-4" onSubmit={submitReview}>
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Your Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Star Rating */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Rating</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-yellow-400 text-2xl transition"
                                >
                                    {star <= (hoverRating || rating) ? (
                                        <AiFillStar />
                                    ) : (
                                        <AiOutlineStar />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Comment</label>
                        <textarea
                            rows={4}
                            placeholder="Write your review here..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-32 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewSection;
