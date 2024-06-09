"use client"

import Header from "@/app/components/layout/Header";

export default function Page() {
    return (
        <>
            <Header title={"About"}/>
            <h1 className={"font-bold text-xl flex items-center justify-center"}>Who are we?</h1>
            <p className={"flex items-center justify-center mx-10 mt-10"}>Welcome to our password safe project! We're a
                group of passionate individuals who embarked on our
                journey in software development in 2021. Despite coming from diverse backgrounds, we share a common
                goal: to create a secure and user-friendly solution for managing passwords.
                <br/>
                <br/>
                Each member of our team is currently balancing academics and professional commitments, dedicating
                our spare time to contribute to this project. We come together with a wealth of knowledge and
                experience gained from our respective educational pursuits and work experiences in various
                companies.
                <br/>
                <br/>
                Driven by our shared enthusiasm for technology and cybersecurity, we strive to deliver a reliable
                password management solution tailored to meet the needs of modern users. Through collaborative
                effort and continuous learning, we aim to provide you with peace of mind in safeguarding your
                sensitive information.
                <br/>
                <br/>
                Thank you for joining us on this exciting journey as we work diligently to enhance your digital
                security and convenience.</p>
            <h1 className={"font-bold text-xl flex items-center justify-center mt-10"}>Who are we?</h1>

            <div className={"flex items-center justify-center mx-10 mt-10"}>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                 alt="Shoes"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}