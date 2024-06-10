"use client";


import Link from "next/link";

type UsCardProps = {
    title: string;
    jobDescription: string;
    company: string;
    imageUrl: string;
    linkedIn: string
    roleInPasswordSafe: string
}

export default function UsCard({title, jobDescription, imageUrl, linkedIn, company, roleInPasswordSafe}: UsCardProps) {

    return (
        <div className="card w-96 bg-base-100 shadow-xl my-10">
            <figure><img src={imageUrl}
                         alt="Profile picture"/></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className={"font-bold"}>{jobDescription}</p>
                <p>{company}</p>
                <p className={""}>{roleInPasswordSafe}</p>
                <div className="card-actions justify-end">
                    <Link className="btn btn-teal-400" href={linkedIn}>Go to Linkedin</Link>
                </div>
            </div>
        </div>
    );
}