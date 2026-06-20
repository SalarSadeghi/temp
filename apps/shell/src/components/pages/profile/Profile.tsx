import ProfileDocuments from "./ProfileDocuments";
import ProfileHeader from "./ProfileHeader";
import ProfileLogout from "./ProfileLogout";
import ProfileSettings from "./ProfileSettings";

const Profile = () => {
  return (
    <div className="flex flex-col gap-2">
      <ProfileHeader />
      <ProfileSettings />
      <ProfileDocuments />
      <ProfileLogout />
    </div>
  );
};

export default Profile;
