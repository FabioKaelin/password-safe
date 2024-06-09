"use client";


import Link from "next/link";

type UsCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    linkedIn: string
}

export default function UsCard({title, description, imageUrl, linkedIn}: UsCardProps) {

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={imageUrl}
                         alt="Shoes"/></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <Link className="btn btn-teal-400" href={linkedIn}>Go to Linkedin</Link>
                </div>
            </div>
        </div>
    );
}