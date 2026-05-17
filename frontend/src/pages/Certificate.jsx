import Navbar from "../components/Navbar";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

function Certificate() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const downloadCertificate = async () => {

        try {

            const input =
                document.getElementById(
                    "certificate"
                );

            const canvas =
                await html2canvas(input, {
                    scale: 2
                });

            const imgData =
                canvas.toDataURL("image/png");

            const pdf =
                new jsPDF(
                    "landscape",
                    "mm",
                    "a4"
                );

            const pdfWidth =
                pdf.internal.pageSize.getWidth();

            const pdfHeight =
                (canvas.height * pdfWidth) /
                canvas.width;

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                pdfWidth,
                pdfHeight
            );

            pdf.save(
                "SpeakFlow-Certificate.pdf"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Certificate download failed."
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            <Navbar />

            <div className="flex flex-col items-center p-4 md:p-10">

                {/* Certificate */}
                <div
                    id="certificate"
                    className="bg-white text-black w-full max-w-5xl rounded-2xl shadow-lg p-6 md:p-12 text-center flex flex-col justify-center"

                    style={{
                        aspectRatio: "3 / 2"
                    }}
                >

                    <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8">

                        Certificate of Achievement

                    </h1>

                    <p className="text-base md:text-2xl mb-3 md:mb-6">

                        This certifies that

                    </p>

                    <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-3 md:mb-6">

                        {user?.name}

                    </h2>

                    <p className="text-base md:text-2xl mb-3 md:mb-6">

                        has successfully completed

                    </p>

                    <h3 className="text-xl md:text-3xl font-semibold mb-4 md:mb-8">

                        AI Communication Training

                    </h3>

                    <p className="text-sm md:text-xl">

                        Powered by SpeakFlow AI

                    </p>

                </div>

                {/* Download Button */}
                <button
                    onClick={downloadCertificate}
                    className="mt-8 md:mt-10 bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition cursor-pointer"
                >

                    Download Certificate

                </button>

            </div>

        </div>

    );
}

export default Certificate;