import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCarId,
  selectError,
  selectFavorite,
  selectIsLoading,
  selectItems,
  selectVisibleCar,
} from '../../redux/selectors';
import {
  CatalogItem,
  Model,
  List,
  Section,
  CatalogImage,
  Button,
  CarDetails,
  StyleModal,
  ModalIMG,
  ModalBtn,
  RentalConditionItem,
  RentalConditionList,
  LoadMore,
  DropdownBox,
  DropdownLabel,
  DropdownInput,
  DropdownBtn,
} from './CatalogList.styled';
import { AiOutlineHeart, AiOutlineClose, AiFillHeart } from 'react-icons/ai';
import {
  addToFavorite,
  loadMore,
  removeFromFavorite,
} from '../../redux/operations';
import { toast } from 'react-toastify';
import { changeFilter } from '../../redux/filterOperations';

const options = [
  { value: " ", label: "Clear filter"},
  { value: 'Buick', label: 'Buick' },
  { value: 'Volvo', label: 'Volvo' },
  { value: 'HUMMER', label: 'HUMMER' },
  { value: 'Subaru', label: 'Subaru' },
  { value: 'Mitsubishi', label: 'Mitsubishi' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'Lincoln', label: 'Lincoln' },
  { value: 'GMC', label: 'GMC' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'MINI', label: 'MINI' },
  { value: 'Bentley', label: 'Bentley' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
  { value: 'Aston Martin', label: 'Aston Martin' },
  { value: 'Pontiac', label: 'Pontiac' },
  { value: 'Lamborghini', label: 'Lamborghini' },
  { value: 'Audi', label: 'Audi' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Chrysler', label: 'Chrysler' },
  { value: 'Kia', label: 'Kia' },
];

const CatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityCar, setCityCar] = useState('');
  const [modalCar, setModalCar] = useState('');
  const [accessories, setAccessories] = useState(null);
  const [functionalities, setFunctionalities] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [page, setPage] = useState(2);
  const error = useSelector(selectError);
  const cars = useSelector(selectItems);
  const favorCars = useSelector(selectFavorite);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const userFilteredCar = useSelector(selectVisibleCar);
  const favId = useSelector(selectCarId);

  function modalOpen(id) {
    let carChoice = cars.flat().find(car => car.id === id);
    setModalCar(carChoice);
    const indexCar = carChoice.address.indexOf(',');
    const cityCar = carChoice.address.slice(indexCar + 2);
    const city = cityCar.split(',', 1);
    setCityCar(city);

    const acsseor = carChoice.accessories.map(el => ' | ' + el);
    setAccessories(acsseor);

    const funtional = carChoice.functionalities.map(el => ' | ' + el);
    setFunctionalities(funtional);

    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
  }

  function modalClose() {
    setIsOpen(false);
    document.body.style.overflowY = 'unset';
  }

  function addCarFavorite(id) {
    let carChoice = cars.flat().find(car => car.id === id);
    const inFavorit = favorCars.some(e => e.id === id);
    if (inFavorit === true) {
      return toast.info('The car is already added to the favorites');
    }
    dispatch(addToFavorite(carChoice));
  }

  function deleteCar(id) {
    dispatch(removeFromFavorite(id));
  }

  return (
    <>
      <DropdownBox>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
          }}
        >
          <div>
            <DropdownLabel>Car brand</DropdownLabel>
            <DropdownInput
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Enter the text"
            />
          </div>

          <DropdownBtn onClick={() => dispatch(changeFilter(selectedOption))}>
            Search
          </DropdownBtn>         
        </div>
      </DropdownBox>

      {isLoading ? (
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        </div>
      ) : (
        <Section>
          <List>
            {userFilteredCar &&
              !error &&
              userFilteredCar
                .flat()
                .map(
                  ({
                    id,
                    img,
                    make,
                    model,
                    year,
                    rentalPrice,
                    address,
                    rentalCompany,
                    type,
                    mileage,
                    functionalities,
                  }) => {
                    const index = address.indexOf(',');

                    return (
                      <CatalogItem key={id}>
                        <CatalogImage src={img} alt={make} />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Model>
                            {make} {model}, {year}
                          </Model>
                          <Model>{rentalPrice}</Model>
                        </div>
                        <CarDetails>
                          {address.slice(index + 2).split(',', 1)} | Ukraine |{' '}
                          {rentalCompany} | {type} |{' '}
                          {mileage.toLocaleString('de-DE')} |{' '}
                          {functionalities[0]}
                        </CarDetails>
                        <Button type="button" onClick={() => modalOpen(id)}>
                          Learn more
                        </Button>
                        {favId.includes(id) ? (
                          <AiFillHeart
                            size={18}
                            color="#3470FF"
                            style={{
                              padding: '5px',
                              position: 'absolute',
                              top: '14px',
                              right: '14px',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteCar(id)}
                          />
                        ) : (
                          <AiOutlineHeart
                            size={18}
                            color="white"
                            style={{
                              padding: '5px',
                              position: 'absolute',
                              top: '14px',
                              right: '14px',
                              cursor: 'pointer',
                            }}
                            onClick={() => addCarFavorite(id)}
                          />
                        )}
                      </CatalogItem>
                    );
                  }
                )}
          </List>
          <LoadMore
            type="button"
            onClick={() => {
              setPage(prev => prev + 1);
              dispatch(loadMore(page));
            }}
          >
            Load More
          </LoadMore>
        </Section>
      )}

      <StyleModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={modalClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(18, 20, 23, 0.5)',
          },
        }}
      >
        <ModalIMG src={modalCar.img} alt={modalCar.make} />
        <p
          style={{
            fontSize: '18px',
            fontWeight: 500,
            fontFamily: 'Manrope',
            marginBottom: 8,
          }}
        >
          {modalCar.make}{' '}
          <span style={{ color: '#3470FF' }}>{modalCar.model}</span>,{' '}
          {modalCar.year}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 4,
            lineHeight: 1.5,
          }}
        >
          {cityCar} | {`Ukraine`} | {`Id: ${modalCar.id}`} |{' '}
          {`Year: ${modalCar.year}`} | {`Type: ${modalCar.type}`}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 12,
          }}
        >
          {`Fuel Consumption: ${modalCar.fuelConsumption}`} |{' '}
          {`Engine Size: ${modalCar.engineSize}`}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: 14,
            color: '#121417',
            marginBottom: 16,
            lineHeight: 1.42,
          }}
        >
          {modalCar.description}
        </p>
        <h3 style={{ fontSize: 14, marginBottom: 8, fontFamily: 'Manrope' }}>
          Accessories and functionalities:
        </h3>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
          }}
        >
          {accessories}
        </p>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '12px',
            color: 'rgba(18, 20, 23, 0.5)',
            marginBottom: 16,
          }}
        >
          {functionalities}
        </p>
        <h3 style={{ fontSize: 14, fontFamily: 'Manrope', marginBottom: 8 }}>
          Rental Conditions:{' '}
        </h3>
        <RentalConditionList>
          <RentalConditionItem>
            {`Minimum age:`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar && modalCar.rentalConditions.slice(13, 15)}
            </span>
          </RentalConditionItem>
          <RentalConditionItem>
            {modalCar && modalCar.rentalConditions.slice(16, 38)}
          </RentalConditionItem>
          <RentalConditionItem>
            {modalCar && modalCar.rentalConditions.split('\n').pop()}
          </RentalConditionItem>
          <RentalConditionItem>
            {`Mileage:`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar && modalCar.mileage.toLocaleString('en-IN')}
            </span>
          </RentalConditionItem>
          <RentalConditionItem>
            {`Price`}{' '}
            <span
              style={{
                color: '#3470FF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              {modalCar.rentalPrice}
            </span>
          </RentalConditionItem>
        </RentalConditionList>
        <ModalBtn href="tel:+380730000000">Rental car</ModalBtn>
        <AiOutlineClose
          onClick={modalClose}
          size={24}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            cursor: 'pointer',
          }}
        />
      </StyleModal>
    </>
  );
};

export default CatalogList;