import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/* Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = (props: { onClick: OnClick; isOpen: boolean }) => {
	const handleClick = () => {
		props.onClick();
	};

	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={handleClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: props.isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: props.isOpen,
				})}
			/>
		</div>
	);
};
