import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'constants/articleProps';
import type { ArticleStateType, OptionType } from 'constants/articleProps';
import { useState, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
	// currentParams: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
}: // currentParams,
ArticleParamsFormProps) => {
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [formValues, setFormValues] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);

	const toggleForm = () => {
		setIsOpenForm((prev) => !prev);
	};

	const onSumbit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formValues);
		setIsOpenForm(false);
	};

	const handleChangeFormField =
		(fieldName: keyof ArticleStateType) => (option: OptionType) =>
			setFormValues((prevValues) => ({
				...prevValues,
				[fieldName]: option,
			}));

	const handleReset = () => setFormValues(defaultArticleState);

	// useLayoutEffect(() => {
	// 	if (isOpenForm) setFormValues(currentParams);
	// }, [isOpenForm]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpenForm(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpenForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenForm,
				})}>
				<form ref={formRef} className={styles.form} onSubmit={onSumbit}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<div className={styles.options}>
						<Select
							options={fontFamilyOptions}
							selected={formValues.fontFamilyOption}
							title='шрифт'
							onChange={handleChangeFormField('fontFamilyOption')}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formValues.fontSizeOption}
							title='Размер шрифта'
							onChange={handleChangeFormField('fontSizeOption')}
						/>
						<Select
							options={fontColors}
							selected={formValues.fontColor}
							title='Цвет шрифта'
							onChange={handleChangeFormField('fontColor')}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={formValues.backgroundColor}
							title='Цвет фона'
							onChange={handleChangeFormField('backgroundColor')}
						/>
						<Select
							options={contentWidthArr}
							selected={formValues.contentWidth}
							title='Ширина контента'
							onChange={handleChangeFormField('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
