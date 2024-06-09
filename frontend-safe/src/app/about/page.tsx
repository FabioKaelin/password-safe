"use client"

import Header from "@/app/components/layout/Header";
import UsCard from "@/app/components/layout/UsCard";
import {getPasswordForUser} from "@/app/vault/api";

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
            <h1 className={"font-bold text-xl flex items-center justify-center mt-10"}>Who are the Founders?</h1>

            <div className={"flex items-center justify-center mx-10 gap-5"}>
                <UsCard title={"Fabio Kälin"} jobDescription={"Developer Apprentice"}
                        imageUrl={"https://media.licdn.com/dms/image/D4D03AQHJmp5uzF5zNw/profile-displayphoto-shrink_400_400/0/1670080638124?e=1723680000&v=beta&t=bwcUIRxAKgexmM0DnnBNb_V-ZALw9qjzME5xFttBmkQ"}
                        linkedIn={"https://www.linkedin.com/in/fabio-k%C3%A4lin-21a3b4259/"} company={"SwissRe"}/>
                <UsCard title={"Shansai Muraleetharan"} jobDescription={"Developer Apprentice"}
                        imageUrl={"https://media.licdn.com/dms/image/D4D03AQEWm96EUA4Btw/profile-displayphoto-shrink_400_400/0/1675358935766?e=1723680000&v=beta&t=ywX4I0BMkIR7rMZYrgyjIjm4TKHeAHZ8pJ-H3DLYEmc"}
                        linkedIn={"https://www.linkedin.com/in/shansai-muraleetharan/"} company={"KPMG Switzerland"}/>
                <UsCard title={"Lukas Winterleitner"} jobDescription={"Developer Apprentice"}
                        imageUrl={"https://media.licdn.com/dms/image/D4E03AQHvpV3WnqSORg/profile-displayphoto-shrink_800_800/0/1712923732042?e=1723680000&v=beta&t=pMTjwFUzRR0RJ5jtAxjOg2IsvDDOoGX5QNiaNhFZ3UU"}
                        linkedIn={"https://www.linkedin.com/in/lukas-winterleitner-035601303/"} company={"NxtLvl"}/>
            </div>
        </>
    );
}