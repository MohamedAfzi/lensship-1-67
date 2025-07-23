import NewListingForm from '@/components/NewListingForm';
import BackButton from '@/components/navigation/BackButton';

const NewListing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton />
        </div>
        <NewListingForm />
      </div>
    </div>
  );
};

export default NewListing;