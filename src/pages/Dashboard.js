import React from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";

import PageTitle from "../components/Typography/PageTitle";
import { MoneyIcon, PeopleIcon, MailIcon, FormsIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";

function Dashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* Description App */}
      <CTA />

      <h1 className="text-3xl text-gray-700 mb-3 dark:text-gray-200">
        Selamat Datang Admin!
      </h1>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Jumlah SPT" value="10">
          <RoundIcon
            icon={MailIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Nota" value="10">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Pelanggan" value="10">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Perusahaan" value="10">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Marine" value="10">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-yellow-500 dark:text-yellow-100"
            bgColorClass="bg-yellow-100 dark:bg-yellow-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Driver" value="10">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-red-500 dark:text-red-100"
            bgColorClass="bg-red-100 dark:bg-red-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Jumlah Tujuan" value="10">
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </>
  );
}

export default Dashboard;
