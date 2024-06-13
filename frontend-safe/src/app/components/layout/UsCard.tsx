"use client";


import Link from "next/link";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LinkedInIcon from "@/app/components/Icons/LinkedInIcon";
import Image from "next/image";

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
            <figure><Image src={imageUrl}
                         alt="Profile picture"/></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className={"font-bold"}>{jobDescription}</p>
                <p>{company}</p>
                <p className={""}>{roleInPasswordSafe}</p>
                <div className="card-actions justify-center mt-5 flex">
                    <Link className="btn btn-teal-400" href={linkedIn}>Go to Linkedin <LinkedInIcon className={"h-10"} /></Link>
                </div>
            </div>
        </div>
    );
}