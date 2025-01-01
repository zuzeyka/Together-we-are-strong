import os

def rename_files_in_folder(folder_path):
    try:
        # Получаем список всех файлов в папке
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and f.endswith('.jpg')]
        
        # Сортируем файлы для предсказуемого порядка
        files.sort()
        
        # Переменные для отслеживания переименования
        for index, file_name in enumerate(files):
            old_path = os.path.join(folder_path, file_name)
            new_name = f"{index}.jpg"
            new_path = os.path.join(folder_path, new_name)
            
            # Переименование
            os.rename(old_path, new_path)
            print(f"'{file_name}' переименован в '{new_name}'")
        
        print("\nВсе файлы успешно переименованы.")
    except Exception as e:
        print(f"Произошла ошибка: {e}")

folder_path = "./src/assets/img"  # Если папка находится в текущей директории
rename_files_in_folder(folder_path)
